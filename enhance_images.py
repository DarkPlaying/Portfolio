import os
from PIL import Image, ImageEnhance

# Configuration
input_dir = r"c:\Users\Sanjay\Documents\portfolio\portfolio-website\public\me"
output_dir = r"c:\Users\Sanjay\Documents\portfolio\portfolio-website\public\me_enhanced"

# Create output directory if it doesn't exist
if not os.path.exists(output_dir):
    os.makedirs(output_dir)

def enhance_image(image_path, output_path):
    with Image.open(image_path) as img:
        # 1. Enhance Contrast
        enhancer = ImageEnhance.Contrast(img)
        img = enhancer.enhance(1.2)  # Increase contrast by 20%
        
        # 2. Enhance Color (Saturation)
        enhancer = ImageEnhance.Color(img)
        img = enhancer.enhance(1.1)  # Increase saturation by 10%
        
        # 3. Enhance Sharpness
        enhancer = ImageEnhance.Sharpness(img)
        img = enhancer.enhance(1.5)  # Increase sharpness
        
        # Save the enhanced image
        img.save(output_path, quality=95)

def main():
    print(f"Starting enhancement of images in: {input_dir}")
    files = [f for f in os.listdir(input_dir) if f.endswith('.jpg')]
    
    for i, filename in enumerate(files):
        input_path = os.path.join(input_dir, filename)
        output_path = os.path.join(output_dir, filename)
        
        enhance_image(input_path, output_path)
        
        if (i + 1) % 10 == 0 or (i + 1) == len(files):
            print(f"Processed {i + 1}/{len(files)} images...")

    print(f"\nSuccess! Enhanced images are saved in: {output_dir}")
    print("If you like the results, you can rename 'me_enhanced' to 'me' after backing up the original.")

if __name__ == "__main__":
    main()
