const chatboxController = async (req, res) => {
    const { message } = req.body;
    console.log(`\n[${new Date().toISOString()}] Nhận tin nhắn mới: "${message}"`);

    try {
        // Bước 1: Phân loại ý định (Intent Detection)
        const classifyModel = genAI.getGenerativeModel({ model: "gemini-2.5-pro" });
        const classifyPrompt = `
Hãy phân loại câu sau vào 1 trong 3 nhóm:

1. SYMPTOM (triệu chứng bệnh)
2. HEALTH_QUESTION (hỏi về sức khỏe chung)
3. NON_MEDICAL (không liên quan y tế)

Câu: "${message}"

Chỉ trả về 1 từ duy nhất: SYMPTOM hoặc HEALTH_QUESTION hoặc NON_MEDICAL
    `.trim();

        const classifyResult = await classifyModel.generateContent(classifyPrompt);
        const type = classifyResult.response.text().trim();
        console.log(`[Intent] ${type}`);

        if (type.includes("NON_MEDICAL")) {
            return res.json({
                reply: "Tôi chỉ hỗ trợ các vấn đề liên quan đến sức khỏe. Bạn hãy nhập triệu chứng hoặc câu hỏi y tế nhé.",
                riskLevel: "low",
                healthScore: 0
            });
        }

        // Bước 2: Xử lý y tế nếu là SYMPTOM hoặc HEALTH_QUESTION
        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-pro",
            generationConfig: {
                responseMimeType: "application/json"
            }
        });

        const prompt = `
Bạn là trợ lý sức khỏe nhanh (health assistant).

QUY TẮC TRẢ LỜI:
- Trả lời ngắn gọn (3–6 dòng tối đa)
- Đi thẳng vào ý chính, không lan man
- Không giải thích dài như tài liệu y khoa
- Không chẩn đoán chắc chắn
- Luôn ưu tiên an toàn

CẤU TRÚC TRẢ LỜI:
1. Khả năng có thể gặp
2. Lời khuyên ngắn gọn
3. Khi nào cần đi khám (nếu nguy hiểm)

QUAN TRỌNG: Bạn BẮT BUỘC phải trả về kết quả dưới định dạng JSON với cấu trúc:
{
  "reply": "Nội dung câu trả lời (có thể dùng markdown cho danh sách/in đậm)",
  "riskLevel": "low" hoặc "medium" hoặc "high",
  "healthScore": Điểm mức độ nghiêm trọng (1-10, vd: đau ngực 9, hắt hơi 2)
}

Người dùng: ${message}
`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Parse JSON từ Gemini
        const data = JSON.parse(text);

        res.json(data);

    } catch (err) {
        console.error(`[${new Date().toISOString()}] Lỗi khi gọi AI:`, err.message || err);
        res.json({ reply: "Lỗi AI server" });
    }
}

module.exports = {
    chatboxController
}