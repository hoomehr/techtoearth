terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
  required_version = ">= 1.0"
}

provider "aws" {
  region = "us-east-1" # Replace with your desired region
}

# -----------------------------------------------------------------------------
# VPC and Networking
# -----------------------------------------------------------------------------

resource "aws_vpc" "main" {
  cidr_block = "10.0.0.0/16"
  tags = {
    Name = "react-app-vpc"
  }
}

resource "aws_subnet" "public_subnet_a" {
  vpc_id     = aws_vpc.main.id
  cidr_block = "10.0.1.0/24"
  availability_zone = "us-east-1a" # Replace with your desired AZ
  map_public_ip_on_launch = true

  tags = {
    Name = "react-app-public-subnet-a"
  }
}

resource "aws_subnet" "public_subnet_b" {
  vpc_id     = aws_vpc.main.id
  cidr_block = "10.0.2.0/24"
  availability_zone = "us-east-1b" # Replace with your desired AZ
  map_public_ip_on_launch = true

  tags = {
    Name = "react-app-public-subnet-b"
  }
}

resource "aws_subnet" "private_subnet_a" {
  vpc_id     = aws_vpc.main.id
  cidr_block = "10.0.3.0/24"
  availability_zone = "us-east-1a" # Replace with your desired AZ

  tags = {
    Name = "react-app-private-subnet-a"
  }
}

resource "aws_subnet" "private_subnet_b" {
  vpc_id     = aws_vpc.main.id
  cidr_block = "10.0.4.0/24"
  availability_zone = "us-east-1b" # Replace with your desired AZ

  tags = {
    Name = "react-app-private-subnet-b"
  }
}

resource "aws_internet_gateway" "main" {
  vpc_id = aws_vpc.main.id

  tags = {
    Name = "react-app-igw"
  }
}

resource "aws_nat_gateway" "main" {
  allocation_id = aws_eip.nat.id
  subnet_id     = aws_subnet.public_subnet_a.id

  tags = {
    Name = "react-app-nat-gateway"
  }

  depends_on = [aws_internet_gateway.main]
}

resource "aws_eip" "nat" {
  domain = "vpc"
}

resource "aws_route_table" "public" {
  vpc_id = aws_vpc.main.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.main.id
  }

  tags = {
    Name = "react-app-public-rt"
  }
}

resource "aws_route_table_association" "public_subnet_a" {
  subnet_id      = aws_subnet.public_subnet_a.id
  route_table_id = aws_route_table.public.id
}

resource "aws_route_table_association" "public_subnet_b" {
  subnet_id      = aws_subnet.public_subnet_b.id
  route_table_id = aws_route_table.public.id
}

resource "aws_route_table" "private" {
  vpc_id = aws_vpc.main.id

  route {
    cidr_block = "0.0.0.0/0"
    nat_gateway_id = aws_nat_gateway.main.id
  }

  tags = {
    Name = "react-app-private-rt"
  }
}

resource "aws_route_table_association" "private_subnet_a" {
  subnet_id      = aws_subnet.private_subnet_a.id
  route_table_id = aws_route_table.private.id
}

resource "aws_route_table_association" "private_subnet_b" {
  subnet_id      = aws_subnet.private_subnet_b.id
  route_table_id = aws_route_table.private.id
}

# -----------------------------------------------------------------------------
# Security Groups
# -----------------------------------------------------------------------------

resource "aws_security_group" "alb" {
  name        = "react-app-alb-sg"
  description = "Allow inbound traffic to ALB"
  vpc_id      = aws_vpc.main.id

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "react-app-alb-sg"
  }
}

resource "aws_security_group" "ec2" {
  name        = "react-app-ec2-sg"
  description = "Allow inbound traffic from ALB and outbound to MongoDB Atlas"
  vpc_id      = aws_vpc.main.id

  ingress {
    from_port   = 3000 # Port your React app runs on
    to_port     = 3000
    protocol    = "tcp"
    security_groups = [aws_security_group.alb.id]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "react-app-ec2-sg"
  }
}


# -----------------------------------------------------------------------------
# Launch Template
# -----------------------------------------------------------------------------
resource "aws_launch_template" "react_app" {
  name_prefix   = "react-app-launch-template"
  image_id      = "ami-0c55b8674c538a261"  # Replace with a suitable AMI (e.g., Ubuntu 22.04)
  instance_type = "t3.medium"  # Cost effective instance type.
  user_data = base64encode(<<EOF
#!/bin/bash
# Update package lists
sudo apt update -y

# Install necessary packages (Node.js, npm, PM2, etc.)
sudo apt install -y curl gnupg
curl -sL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs
sudo npm install -g pm2

# Configure PM2 to start the application on boot
sudo pm2 startup systemd

# Clone the repo, install dependencies and run the app
git clone <YOUR_GIT_REPO_URL> /home/ubuntu/app
cd /home/ubuntu/app
npm install
npm run build
pm2 start npm --name "react-app" -- start

EOF
  )

  network_interface {
    security_groups = [aws_security_group.ec2.id]
  }

  iam_instance_profile {
    name = aws_iam_instance_profile.ec2.name
  }

  tag_specifications {
    resource_type = "instance"

    tags = {
      Name = "react-app-instance"
    }
  }
}


# -----------------------------------------------------------------------------
# Auto Scaling Group
# -----------------------------------------------------------------------------

resource "aws_autoscaling_group" "main" {
  name                      = "react-app-asg"
  launch_template {
    id      = aws_launch_template.react_app.id
    version = "$Latest"
  }
  vpc_zone_identifier       = [aws_subnet.private_subnet_a.id, aws_subnet.private_subnet_b.id]
  min_size                  = 2
  max_size                  = 5
  desired_capacity          = 2
  health_check_type         = "ELB"
  health_check_grace_period = 300
  target_group_arns         = [aws_lb_target_group.react_app.arn]

  tag {
    key                 = "Name"
    value               = "react-app-instance"
    propagate_at_launch = true
  }
}

# -----------------------------------------------------------------------------
# Load Balancer
# -----------------------------------------------------------------------------

resource "aws_lb" "main" {
  name               = "react-app-alb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.alb.id]
  subnets            = [aws_subnet.public_subnet_a.id, aws_subnet.public_subnet_b.id]

  tags = {
    Name = "react-app-alb"
  }
}

resource "aws_lb_target_group" "react_app" {
  name        = "react-app-tg"
  port        = 3000  # Port your React app runs on
  protocol    = "HTTP"
  vpc_id      = aws_vpc.main.id
  health_check {
    path     = "/" # Your application's health check path
    protocol = "HTTP"
  }
}

resource "aws_lb_listener" "http" {
  load_balancer_arn = aws_lb.main.arn
  port              = 80
  protocol          = "HTTP"

  default_action {
    type             = "redirect"
    redirect {
      port         = "443"
      protocol     = "HTTPS"
      status_code  = "HTTP_301"
    }
  }
}


resource "aws_lb_listener" "https" {
  load_balancer_arn = aws_lb.main.arn
  port              = 443
  protocol          = "HTTPS"
  ssl_policy        = "ELBSecurityPolicy-2016-08" # Modern TLS settings

  certificate_arn   = "arn:aws:acm:us-east-1:<ACCOUNT_ID>:certificate/<CERTIFICATE_ID>" # Replace with your ACM certificate ARN

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.react_app.arn
  }
}

# -----------------------------------------------------------------------------
# Route 53
# -----------------------------------------------------------------------------
# Requires pre-existing Route 53 hosted zone
resource "aws_route53_record" "app" {
  zone_id = "<ROUTE53_ZONE_ID>"  # Replace with your Route 53 hosted zone ID
  name    = "app.example.com"    # Replace with your desired domain
  type    = "A"

  alias {
    name                   = aws_lb.main.dns_name
    zone_id                = aws_lb.main.zone_id
    evaluate_target_health = true
  }
}

# -----------------------------------------------------------------------------
# IAM Role for EC2 Instances
# -----------------------------------------------------------------------------

resource "aws_iam_role" "ec2" {
  name = "react-app-ec2-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Action = "sts:AssumeRole",
        Principal = {
          Service = "ec2.amazonaws.com"
        },
        Effect = "Allow",
        Sid   = ""
      },
    ]
  })
}

resource "aws_iam_instance_profile" "ec2" {
  name = "react-app-ec2-profile"
  role = aws_iam_role.ec2.name
}

resource "aws_iam_policy" "ec2" {
  name        = "react-app-ec2-policy"
  description = "Policy for EC2 instances to access S3 and CloudWatch"

  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Action = [
          "s3:GetObject",
          "s3:ListBucket"
        ],
        Effect   = "Allow",
        Resource = [
          "arn:aws:s3:::<S3_BUCKET_NAME>",  # Replace with your S3 bucket ARN
          "arn:aws:s3:::<S3_BUCKET_NAME>/*"
        ]
      },
      {
        Action = [
          "logs:CreateLogGroup",
          "logs:CreateLogStream",
          "logs:PutLogEvents"
        ],
        Effect   = "Allow",
        Resource = "arn:aws:logs:*:*:*"
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "ec2_s3" {
  role       = aws_iam_role.ec2.name
  policy_arn = aws_iam_policy.ec2.arn
}

# -----------------------------------------------------------------------------
# CloudFront and S3
# -----------------------------------------------------------------------------

resource "aws_s3_bucket" "bucket" {
  bucket = "<S3_BUCKET_NAME>"  # Replace with your S3 bucket name

  tags = {
    Name = "react-app-static-assets"
  }
}

resource "aws_s3_bucket_acl" "example" {
  bucket = aws_s3_bucket.bucket.id
  acl    = "private"
}

resource "aws_cloudfront_distribution" "s3_distribution" {
  origin {
    domain_name = aws_s3_bucket.bucket.bucket_regional_domain_name
    origin_id   = "s3_origin"

    s3_origin_config {
      origin_access_identity = "origin-access-identity/cloudfront/<CLOUDFRONT_ORIGIN_ID>" # Replace. Use `aws cloudfront create-origin-access-identity --comment "Access to the s3"`
    }
  }

  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "index.html"

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "s3_origin"

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
  }

  price_class = "PriceClass_100"

  viewer_certificate {
    cloudfront_default_certificate = true
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

}

# -----------------------------------------------------------------------------
# CI/CD using GitHub Actions
# -----------------------------------------------------------------------------

# The following Github Actions workflow can be used to deploy the application

# name: Deploy to AWS

# on:
#   push:
#     branches:
#       - main

# jobs:
#   deploy:
#     runs-on: ubuntu-latest

#     steps:
#       - name: Checkout code
#         uses: actions/checkout@v3

#       - name: Setup Terraform
#         uses: hashicorp/setup-terraform@v2
#         with:
#           terraform_version: 1.0.0  # Replace with your Terraform version

#       - name: Configure AWS Credentials
#         uses: aws-actions/configure-aws-credentials@v2
#         with:
#           aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
#           aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
#           aws-region: us-east-1  # Replace with your AWS region

#       - name: Terraform Init
#         run: terraform init

#       - name: Terraform Apply
#         run: terraform apply -auto-approve