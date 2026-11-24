Add-Type -AssemblyName System.Drawing
$imgPath = Resolve-Path "public/sankalp-logo.png"

# Copy original to sankalp-logo-original.png if not exists
if (-not (Test-Path "public/sankalp-logo-original.png")) {
    Copy-Item $imgPath "public/sankalp-logo-original.png"
}

$origBmp = [System.Drawing.Bitmap]::FromFile("public/sankalp-logo-original.png")
$width = $origBmp.Width
$height = $origBmp.Height

# Create a new 32-bit ARGB bitmap
$newBmp = New-Object System.Drawing.Bitmap($width, $height, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

# Background color is ~ (247, 247, 247)
# Any pixel where R >= 240 and G >= 240 and B >= 240 and max diff between R,G,B <= 10 should be transparent
# For edge pixels (anti-aliasing), we can calculate alpha based on lightness
for ($y = 0; $y -lt $height; $y++) {
    for ($x = 0; $x -lt $width; $x++) {
        $c = $origBmp.GetPixel($x, $y)
        
        # Check if it is the light gray/white background
        # Background is essentially R=247, G=247, B=247
        $isBg = ($c.R -ge 243) -and ($c.G -ge 243) -and ($c.B -ge 243)
        $isNearBg = ($c.R -ge 235) -and ($c.G -ge 235) -and ($c.B -ge 235) -and ([Math]::Abs($c.R - $c.G) -le 8) -and ([Math]::Abs($c.G - $c.B) -le 8)
        
        if ($isBg -or $isNearBg) {
            # Make completely transparent
            $newBmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 0, 0, 0))
        } else {
            # If it is semi-light gray at the anti-aliased fringe
            $isFringe = ($c.R -ge 215) -and ($c.G -ge 215) -and ($c.B -ge 215) -and ([Math]::Abs($c.R - $c.G) -le 10) -and ([Math]::Abs($c.G - $c.B) -le 10)
            if ($isFringe) {
                # Feather alpha
                $avg = ($c.R + $c.G + $c.B) / 3.0
                $alpha = [int]([Math]::Max(0, [Math]::Min(255, (247 - $avg) * 8)))
                if ($alpha -le 10) {
                    $newBmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 0, 0, 0))
                } else {
                    $newBmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb($alpha, $c.R, $c.G, $c.B))
                }
            } else {
                # Keep full original color
                $newBmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(255, $c.R, $c.G, $c.B))
            }
        }
    }
}

$origBmp.Dispose()
$newBmp.Save("public/sankalp-logo.png", [System.Drawing.Imaging.ImageFormat]::Png)
$newBmp.Dispose()

Write-Host "Successfully converted public/sankalp-logo.png to transparent background!"
