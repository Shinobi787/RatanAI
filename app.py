import streamlit as st
import requests
import os
from PIL import Image
import io
import json

# App title and description
st.set_page_config(page_title="UPI Transaction Analyzer", page_icon="💰")
st.title("💰 UPI Transaction Analyzer")
st.write("Upload your UPI transaction screenshot to extract financial insights")

# File uploader
uploaded_file = st.file_uploader("Choose a UPI transaction screenshot", type=["jpg", "jpeg", "png"])

# API configuration
import streamlit as st
API_URL = "http://localhost:8000/api/test/test-ocr"  # Change to your backend URL
OPENAI_KEY = st.secrets["OPENAI_API_KEY"]  # Get from Streamlit secrets


if uploaded_file is not None:
    # Display the uploaded image
    image = Image.open(uploaded_file)
    st.image(image, caption='Uploaded Transaction', use_column_width=True)
    
    # Process button
    if st.button("Analyze Transaction"):
        with st.spinner("Extracting transaction details..."):
            try:
                # Prepare the request
                files = {"transactionImage": uploaded_file.getvalue()}
                
                # Send to backend API
                response = requests.post(API_URL, files=files)
                
                if response.status_code == 200:
                    data = response.json()
                    st.success("Transaction processed successfully!")
                    
                    # Display results
                    st.subheader("Transaction Details")
                    st.json(data['data'])
                    
                    # Visual insights
                    st.subheader("Spending Insights")
                    col1, col2 = st.columns(2)
                    with col1:
                        st.metric("Amount", f"₹{data['data']['amount']}")
                    with col2:
                        st.metric("Category", data['data']['category'].title())
                    
                else:
                    st.error(f"Error processing transaction: {response.text}")
            
            except Exception as e:
                st.error(f"An error occurred: {str(e)}")

# Footer
st.markdown("---")
st.caption("Built with ❤️ using Streamlit | [Deploy on Streamlit Community Cloud](https://streamlit.io/cloud)")
