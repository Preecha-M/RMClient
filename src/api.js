export async function predictImage(imageFile) {
    const formData = new FormData();
    formData.append("image", imageFile);

    console.log("Sending request to /api/predict...");
    
    const response = await fetch("/api/predict", {
        method: "POST",
        body: formData
    });

    console.log("Response received:", response);

    if (!response.ok) {
        console.error(`Failed to fetch: ${response.statusText}`);
        throw new Error(`Failed to fetch: ${response.statusText}`);
    }

    const jsonData = await response.json();
    console.log("Prediction result:", jsonData);
    
    return jsonData;
}