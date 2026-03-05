export default async function handler(req, res) {

const userMessage = req.body.message || "";

const wantsImage = /(image|picture|map|diagram|photo|चित्र|नक्शा|तस्वीर)/i.test(userMessage);

const systemPrompt = `
You are a helpful AI assistant similar to ChatGPT.

Capabilities:
- Answer any topic
- Support Hindi and English
- Generate MCQs if asked
- Generate notes if asked
- Explain concepts clearly
- Format answers in bullet points when useful
`;

try {

const response = await fetch(
"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyDSlFdNevnpenp5oKQtGtBUikQMJMd-lGA",
{
method:"POST",
headers:{ "Content-Type":"application/json" },
body:JSON.stringify({
contents:[
{
parts:[
{ text: systemPrompt + "\nUser Question: " + userMessage }
]
}
]
})
}
);

const data = await response.json();

const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't answer.";

let imageURL = null;

if(wantsImage){
imageURL = "https://source.unsplash.com/600x400/?"+encodeURIComponent(userMessage);
}

res.status(200).json({
reply,
image:imageURL
});

} catch(e){

res.status(200).json({
reply:"AI temporarily unavailable."
});

}

}
