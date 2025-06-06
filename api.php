<?php
// wallpapers.php

// --- Configuration ---
// Set the name of the directory where your wallpaper images are stored.
// This directory should be in the SAME FOLDER as this wallpapers.php script.
// For example, if wallpapers.php is in your public root (e.g., /public_html/wallpapers.php),
// and your images are in /public_html/my_actual_wallpapers/, set $image_subdir_name to 'my_actual_wallpapers'.
$image_subdir_name = 'bgs'; // <--- IMPORTANT: RENAME THIS to your images folder

// --- End Configuration ---

$image_directory_path = __DIR__ . '/' . $image_subdir_name;
$image_urls = [];

// Try to find local images
// Supported extensions: jpg, jpeg, png, gif. Add more if needed.
$local_image_files = glob($image_directory_path . '/*.{jpg,jpeg,png,gif,webp}', GLOB_BRACE);

if ($local_image_files && count($local_image_files) > 0) {
    foreach ($local_image_files as $file_path) {
        // Construct a URL relative to the web root.
        // This assumes wallpapers.php and the image subdirectory are accessible directly under the domain.
        // e.g., http://yourdomain.com/my_actual_wallpapers/image.jpg
        $image_urls[] = $image_subdir_name . '/' . basename($file_path);
    }
}

// Fallback to placeholder images if no local images are found or the directory is empty/misconfigured.
if (empty($image_urls)) {
    die('No images found in the specified directory.');
}

file_put_contents(
    __DIR__ . '/image_urls.json',
    json_encode($image_urls)
);

// Shuffle the array to randomize the order
shuffle($image_urls);

// Set the content type header to indicate JSON response
header('Content-Type: application/json');

// Output the image URLs as a JSON array
echo json_encode(array_values($image_urls)); // array_values ensures it's a 0-indexed array for JS

exit;
