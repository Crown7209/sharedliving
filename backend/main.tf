terraform {
  required_providers {
    vercel = {
      source  = "vercel/vercel"
      version = "~> 0.3"
    }
  }
}

resource "vercel_project" "example-frontend" {
  name             = "example-frontend"
  build_command    = "nx build --skip-nx-cache example-frontend"
  output_directory = "./dist/apps/example/frontend/.next"
  framework        = "nextjs"
  team_id          = "team_id"
}


variable "VERCEL_TOKEN" {
  type        = string
  description = "Optionally say something about this variable"
}

provider "vercel" {
  # Or omit this for the api_token to be read
  # from the VERCEL_API_TOKEN environment variable
  api_token = var.VERCEL_TOKEN

  # Optional default team for all resources
  team = "team_id"
}