# 🧠 Brain Tumor MRI Classifier

A CNN-based web app that classifies brain MRI scans into 4 categories — **glioma**, **meningioma**, **pituitary**, and **no tumor**.

## Stack
- **Model** — TensorFlow/Keras CNN, trained on 5,600 MRI images (Kaggle dataset)
- **Backend** — Flask `/predict` endpoint
- **Frontend** — Vanilla HTML/CSS/JS, dark-themed UI

## How it works
Upload an MRI scan → get the tumor class, confidence score, a brief summary, and a severity hint.

## Model Performance
- ~89% validation accuracy over 10 epochs (Google Colab T4 GPU)
- 4-class classification: glioma · meningioma · pituitary · notumor

## Disclaimer
Not a medical device. For research & educational use only.
