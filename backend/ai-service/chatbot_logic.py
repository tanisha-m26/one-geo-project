def answer_question(question, ai_results, metrics):
    q = question.lower()

    # -----------------------
    # facies
    # -----------------------
    if "facies" in q:
        facies = [r for r in ai_results if r["category"] == "Facies"]
        return f"Detected {len(facies)} facies zones. These represent different rock types."
    
    # -----------------------
    # anomaly
    # -----------------------
    if "anomaly" in q:
        anomalies = [r for r in ai_results if r["category"] == "Anomaly"]
        if anomalies:
            return f"{len(anomalies)} anomalies detected. Possible fractures or tool noise."
        return "No major anomalies detected."
    

   # -----------------------
    # hydrocarbon
    # -----------------------
    if "hydrocarbon" in q or "pay zone" in q:
        zones = [r for r in ai_results if r["category"] == "Hydrocarbon Zone"]
        if zones:
            return f"{len(zones)} potential hydrocarbon zones identified."
        return "No strong hydrocarbon indicators found."


    if "accuracy" in q:
        return f"Model accuracy is {metrics['accuracy']}% with F1 score {metrics['f1_score']}."

    # -----------------------
    # cluster
    # -----------------------
    if "cluster" in q:
        clusters = [r for r in ai_results if r["category"] == "Cluster"]
        return f"Cluster analysis reveals {len(clusters)} stratigraphic groupings."

    
    if "confidence" in q:
        return "Higher accuracy and F1 score indicate reliable predictions."

    # -----------------------
    # fallback
    # -----------------------
    return "I can explain facies, anomalies, hydrocarbons, clusters, or model metrics.AI insight: patterns suggest changing reservoir quality with depth."


   
