# RatanAI

![Demo](https://via.placeholder.com/800x400?text=UPI+Transaction+Analyzer+Demo)

A fintech application that analyzes UPI transaction screenshots using AI to provide spending insights.

## Features

- 📸 Upload UPI transaction screenshots
- 🔍 AI-powered transaction data extraction
- 📊 Visual spending analytics
- 💰 Automatic expense categorization
- 📱 Mobile-friendly interface

## Tech Stack

- **Frontend**: Streamlit
- **AI**: OpenAI Vision API
- **Deployment**: Streamlit Community Cloud

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/upi-analyzer.git
cd upi-analyzer
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Set up environment variables:
```bash
echo "OPENAI_API_KEY=your_api_key_here" > .env
```

## Running Locally

```bash
streamlit run streamlit_app.py
```

## Deployment to Streamlit Cloud

1. Push to GitHub
2. Go to [Streamlit Community Cloud](https://streamlit.io/cloud)
3. Connect your GitHub account
4. Select this repository
5. Set main file to `streamlit_app.py`
6. Add your OpenAI API key as a secret

## Project Structure

```
├── streamlit_app.py         # Main Streamlit application
├── requirements.txt         # Python dependencies
├── README.md                # Project documentation
├── backend/                 # (Optional) FastAPI backend
└── .env.example             # Environment variables template
```

## License

[MIT](https://choosealicense.com/licenses/mit/)
