Add-Type -AssemblyName System.Drawing
$imgPath = Resolve-Path "public/sankalp-logo.png"
$bmp = [System.Drawing.Bitmap]::FromFile($imgPath)
Write-Host "Image dimensions: $($bmp.Width) x $($bmp.Height)"
Write-Host "PixelFormat: $($bmp.PixelFormat)"

for ($x = 0; $x -lt 5; $x++) {
    $c = $bmp.GetPixel($x, 0)
    Write-Host "Pixel ($x, 0): R=$($c.R), G=$($c.G), B=$($c.B), A=$($c.A)"
}
$bmp.Dispose()
