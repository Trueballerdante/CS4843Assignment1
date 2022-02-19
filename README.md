# CS4843Assignment1
## Description:
This is a website that displays information about me, images, a video, links, and a game.
### Technologies Used:
- HTML: Used to display the text, images, videos, links, and game canvas on the website.
- CSS: Used to customize the header, navigation bar, links, and images.
- JavaScript: Used to create a 2d game.

### Infrastructure:
AWS's S3 was utilized to host my website files.
S3 Configuration:
- AWS Region: US East (Ohio) us-east-2
- Static website hosting is enabled.
- All public access is blocked.
- Bucket Policy:

`{
    "Version": "2008-10-17",
    "Id": "PolicyForCloudFrontPrivateContent",
    "Statement": [
        {
            "Sid": "1",
            "Effect": "Allow",
            "Principal": {
                "AWS": "arn:aws:iam::cloudfront:user/CloudFront Origin Access Identity E36RGCVVKDMIVJ"
            },
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::qgo452cs4843assign1/*"
        }
    ]
}`

This policy allows the users to access the website.

Cloud front was also used to deploy the S3 bucket through a world wide network of data centers.
- All edge locations are used.
- HTTP/2, HTTP/1.1, HTTP/1.0 are all supported.
- The default root object is welcomePage.html
- IPv6 is enabled

My website link: [https://d340ydq210wqw8.cloudfront.net](https://d340ydq210wqw8.cloudfront.net)
