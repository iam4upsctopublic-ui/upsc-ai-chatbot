export default async function handler(req, res) {

const prompt = req.body.message;

const response = await fetch(
"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyDSlFdNevnpenp5oKQtGtBUikQMJMd-lGA",
{
method:"POST",
headers:{ "Content-Type":"application/json" },
body:JSON.stringify({
contents:[{
parts:[{
text:`You are a UPSC tutor.

Help students with:
- UPSC doubts
- MCQ generation
- concept explanation
- current affairs
- notes summary

Question: ${prompt}`
}]
}]
})
}
);

const data = await response.json();

res.status(200).json({
reply:data.candidates[0].content.parts[0].text
});

}
