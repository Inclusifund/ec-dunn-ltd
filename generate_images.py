#!/usr/bin/env python3
"""
EC Dunn Ltd — AI Image Generator
Generates high-quality website images using Google Imagen 4.0
Inspired by Pinterest ceiling skirting, crown molding, and luxury interior aesthetics.
"""

import os
import sys
from pathlib import Path
from google import genai
from google.genai import types

API_KEY = os.environ.get("GEMINI_API_KEY")
if not API_KEY:
    raise RuntimeError("Set GEMINI_API_KEY env var before running. Add to ~/.claude/.env")
IMAGE_MODEL = "imagen-4.0-generate-001"
NATIVE_IMAGE_MODEL = "gemini-2.5-flash-preview-05-20"
OUTPUT_DIR = Path(__file__).parent / "public" / "images" / "ai"

# Design direction: Pinterest ceiling skirting, crown molding, ornate plasterwork,
# LED-lit recessed ceilings, heritage interior art deco, luxury interiors

IMAGES = [
    {
        "filename": "hero-main",
        "prompt": """
A breathtaking interior photograph of an elegant luxury living room with an ornate
ceiling featuring intricate crown molding and decorative ceiling skirting. The ceiling
has a beautiful recessed panel design with subtle LED strip lighting creating a warm
golden glow around the perimeter. Rich dark wood wall paneling below. The room has
warm ambient lighting, cream and gold colour palette. Shot from below looking up at
the ceiling detail. Ultra high quality architectural photography, 8K resolution,
professional interior design magazine quality. Photorealistic.
""",
    },
    {
        "filename": "hero-detail",
        "prompt": """
Close-up architectural detail photograph of an exquisite decorative ceiling rose and
crown molding junction. Ornate plasterwork with classical acanthus leaf motifs and
egg-and-dart border patterns. The plasterwork is pristine white against a soft cream
ceiling. Warm ambient side lighting creates beautiful shadows highlighting the depth
and craftsmanship of the molding profiles. Professional architectural photography,
ultra sharp detail, shallow depth of field. Magazine quality.
""",
    },
    {
        "filename": "sector-school",
        "prompt": """
Modern school corridor interior with a clean professional suspended ceiling installation.
Bright LED panel lights integrated into a white mineral fibre tile ceiling grid system.
The corridor has colourful educational displays on the walls, polished floors, and
natural light from windows. The ceiling is perfectly level with neat, precise grid lines.
Clean, bright, and welcoming atmosphere. Professional architectural photography of a
recently renovated UK school building interior.
""",
    },
    {
        "filename": "sector-hospital",
        "prompt": """
Clean modern hospital corridor interior with a hygienic suspended ceiling system.
White antibacterial ceiling tiles with recessed LED lighting panels. The corridor
is spotlessly clean with smooth walls, handrails, and medical-grade finishes. Natural
light enters from side windows. A few medical professionals walk in the background.
The ceiling installation is flawless — perfectly aligned tiles with no gaps.
Professional healthcare facility photography, bright and reassuring atmosphere.
""",
    },
    {
        "filename": "sector-restaurant",
        "prompt": """
Upscale restaurant interior with a stunning bespoke ceiling design. A floating
ceiling raft with hidden LED strip lighting creates a warm golden glow. Elegant
decorative ceiling details with subtle art deco-inspired geometric patterns. Dark
wood paneling on walls, ambient warm lighting from pendant fixtures. Tables set
with white linens and wine glasses. The ceiling is the focal point — showing
exceptional craftsmanship with clean lines and integrated lighting. Luxury
hospitality interior photography, moody and sophisticated.
""",
    },
    {
        "filename": "sector-heritage",
        "prompt": """
Interior of a beautifully restored heritage building with an ornate decorative
plaster ceiling. Intricate Victorian-era ceiling rose surrounded by elaborate
ceiling skirting and cornice work with classical motifs — acanthus leaves,
dentil molding, and egg-and-dart borders. Art deco-inspired geometric panel
details. The plasterwork has been expertly restored to pristine condition.
Warm natural light from tall sash windows illuminates the craftsmanship.
Period features throughout — ornate fireplace, dado rails. Professional
heritage restoration photography, rich and atmospheric.
""",
    },
    {
        "filename": "sector-commercial",
        "prompt": """
Modern open-plan commercial office interior with a professional suspended ceiling
system. Clean white ceiling tiles with integrated LED panel lighting creating
bright, even illumination. Glass partition walls divide meeting rooms. Contemporary
office furniture, plants, and a professional working atmosphere. The ceiling
is perfectly installed with air conditioning vents and lighting seamlessly
integrated into the grid. Professional commercial interior photography,
clean and corporate.
""",
    },
    {
        "filename": "sector-retail",
        "prompt": """
High-end retail store interior with a designer ceiling featuring floating
ceiling rafts and recessed lighting. Clean modern aesthetic with MF ceiling
system creating smooth seamless surfaces. Warm spotlighting highlights the
merchandise displays. The ceiling design adds architectural interest with
different levels and integrated lighting tracks. Premium retail environment
with polished floors and elegant display fixtures. Professional retail
interior photography.
""",
    },
    {
        "filename": "about-team",
        "prompt": """
Interior photograph of a high-end residential room under construction showing
expert ceiling work in progress. A beautifully crafted MF ceiling with perfect
smooth plaster finish, ready for LED lighting installation. The room shows the
transition from raw construction to premium finish — one half shows the metal
framework, the other half shows the flawless plastered result. Professional
construction tools neatly arranged. Warm natural light from windows. Shows
the skill and precision of quality tradesmen. Documentary-style construction
photography.
""",
    },
    {
        "filename": "portfolio-luxury",
        "prompt": """
Luxury residential room with a spectacular multi-level recessed ceiling design
with continuous LED strip lighting creating a floating effect. The ceiling has
three recessed levels with warm white light emanating from each level. Below,
elegant wall paneling with decorative molding in a dark rich wood finish.
Crystal chandelier hangs from the central ceiling feature. The room exudes
opulence and expert craftsmanship. Cream, gold, and dark wood colour palette.
Ultra high quality interior design photography, warm ambient lighting.
""",
    },
    {
        "filename": "portfolio-circular",
        "prompt": """
Stunning modern circular recessed ceiling feature with an integrated LED ring
light. The circular detail is perfectly geometric with a smooth plaster finish
and continuous warm LED strip lighting around the perimeter. Set in a
contemporary hallway with clean white walls and a small round porthole window.
The circular ceiling feature is the dramatic focal point — showing exceptional
precision and modern design sensibility. Architectural photography with
dramatic upward angle.
""",
    },
    {
        "filename": "portfolio-heritage-panel",
        "prompt": """
Exquisite ornate decorative ceiling panel with intricate classical plasterwork
patterns. The panel features elaborate floral and geometric motifs in high
relief, surrounded by detailed ceiling skirting and cornice molding. Hidden
LED backlighting creates a warm glow around the edges of the panel,
highlighting the depth and artistry of the plasterwork. Set within a room
with rich dark wood paneling and period features. Heritage restoration
craftsmanship at its finest. Professional close-up architectural photography
with warm lighting.
""",
    },
    {
        "filename": "whyus-bg",
        "prompt": """
Wide-angle interior photograph of a grand room with exceptional ceiling
craftsmanship. Multiple ceiling features visible — decorative cornicing,
recessed panels with LED lighting, and ornate plaster details. Shot from
a low angle emphasising the scale and quality of the ceiling work.
Warm golden lighting creates a premium atmosphere. Slightly desaturated
and moody — suitable for use as a dark overlay background image.
Architectural photography with dramatic perspective.
""",
    },
]


def generate_image(client, prompt, output_path):
    """Generate a single image using Imagen 4.0 with Gemini fallback."""
    print(f"  Generating: {output_path.name}...")
    output_path.parent.mkdir(parents=True, exist_ok=True)

    # Try Imagen 4.0 first
    try:
        print(f"    Using Imagen 4.0...")
        response = client.models.generate_images(
            model=IMAGE_MODEL,
            prompt=prompt.strip(),
            config=types.GenerateImagesConfig(
                number_of_images=1,
            ),
        )
        if response.generated_images:
            img = response.generated_images[0]
            img.image.save(str(output_path))
            print(f"    Saved: {output_path}")
            return True
    except Exception as e:
        print(f"    Imagen 4.0 failed: {e}")

    # Fallback: Gemini native image output
    try:
        print(f"    Trying {NATIVE_IMAGE_MODEL}...")
        response = client.models.generate_content(
            model=NATIVE_IMAGE_MODEL,
            contents=[prompt.strip()],
            config=types.GenerateContentConfig(
                response_modalities=["IMAGE", "TEXT"],
            ),
        )
        if response.candidates:
            for part in response.candidates[0].content.parts:
                if part.inline_data and part.inline_data.mime_type.startswith("image/"):
                    img_data = part.inline_data.data
                    with open(output_path, "wb") as f:
                        f.write(img_data)
                    print(f"    Saved: {output_path}")
                    return True
    except Exception as e:
        print(f"    Gemini fallback failed: {e}")

    print(f"    FAILED: {output_path.name}")
    return False


def main():
    client = genai.Client(api_key=API_KEY)
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    print(f"EC Dunn Ltd — Image Generator")
    print(f"Output: {OUTPUT_DIR}\n")

    success = 0
    total = len(IMAGES)

    for img in IMAGES:
        path = OUTPUT_DIR / f"{img['filename']}.png"
        if generate_image(client, img["prompt"], path):
            success += 1

    print(f"\nDone: {success}/{total} images generated.")
    print(f"Output: {OUTPUT_DIR}")


if __name__ == "__main__":
    main()
