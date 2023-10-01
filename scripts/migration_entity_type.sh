#!/bin/bash

# Default branch is set to 'master'
branch="master"
temp_path="./temp"
# Parse command line arguments
while [[ $# -gt 0 ]]; do
    key="$1"
    case $key in
        --git)
            git_url="$2"
            shift
            shift
            ;;
        --branch|-b)
            branch="$2"
            shift
            shift
            ;;
        --input|-i)
            input_param="$2"
            shift
            shift
            ;;
        --output|-o)
            output_param="$2"
            shift
            shift
            ;;
        *)
            echo "Unknown option: $1"
            exit 1
            ;;
    esac
done

if [ -z "$git_url" ]; then
    echo "Git URL is required. Use --git <url> to specify the repository URL."
      rm -rf $temp_path
    exit 1
fi

if [ -z "$input_param" ]; then
    echo "Input parameter is needed. Use --input or -i <path>  to specify the input path ."
    rm -rf $temp_path
    exit 1
fi

if [ -z "$output_param" ]; then
    echo "Input parameter is needed. Use --output or -o <path>  to specify the output path ."
    rm -rf $temp_path
    exit 1
fi

git clone "$git_url" $temp_path


repo_name=$(basename "$git_url" .git)
cd "$temp_path"


git checkout "$branch"
git fetch
git pull


dotnet tool install --global CSharpToTypeScript.CLITool

dotnet cs2ts  -o "../$output_param" -i Simple $input_param && cd .. && rm -rf $temp_path 