import { Client } from "@gradio/client";

export async function POST(req) {
    try {
        console.log("Received request to /api/predict");

        const formData = await req.formData();
        const image = formData.get("image");

        if (!image) {
            console.error("No image found in request.");
            return new Response(JSON.stringify({ error: "No image provided" }), { status: 400 });
        }

        const imageBlob = new Blob([await image.arrayBuffer()], { type: image.type });

        console.log("Connecting to Gradio Client...");
        const client = await Client.connect("Teayear/Rice");

        console.log("Sending image for prediction...");
        const result = await client.predict("/predict", { image: imageBlob });

        console.log("Prediction result:", result.data);
        return new Response(JSON.stringify(result.data[0]), { status: 200 });  // Send only the first result
    } catch (error) {
        console.error("Error in /api/predict:", error.message);
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}
