const mockResponse ={
  "chatResponse": "Fashion items are a hit in Manchester, especially among mid-income customers. Here’s what they’re buying.",
  "tabularData": [
    {"ProductID": "P010", "ItemName": "Leather Jacket", "MerchantName": "StyleHub", "QuantitySold": 150, "AvgDiscount": "8%"},
    {"ProductID": "P011", "ItemName": "Sneakers", "MerchantName": "UrbanFeet", "QuantitySold": 200, "AvgDiscount": "5%"},
     {"ProductID": "P012", "ItemName": "Leather Jacket", "MerchantName": "StyleHub", "QuantitySold": 150, "AvgDiscount": "8%"},
    {"ProductID": "P013", "ItemName": "Sneakers", "MerchantName": "UrbanFeet", "QuantitySold": 200, "AvgDiscount": "5%"},
    {"ProductID": "P014", "ItemName": "Designer Handbag", "MerchantName": "ChicBoutique", "QuantitySold": 120, "AvgDiscount": "10%"},
    {"ProductID": "P015", "ItemName": "Wool Coat", "MerchantName": "WinterWear", "QuantitySold": 100, "AvgDiscount": "12%"},
    {"ProductID": "P016", "ItemName": "Fashion Scarf", "MerchantName": "StyleHub", "QuantitySold": 180, "AvgDiscount": "6%"},
    {"ProductID": "P017", "ItemName": "Trendy Sunglasses", "MerchantName": "UrbanFeet", "QuantitySold": 160, "AvgDiscount": "7%"}
  ],
  "sqlQuery": "SELECT p.ProductID, p.ItemName, m.MerchantName, SUM(t.Quantity) AS QuantitySold, AVG(t.DiscountApplied) AS AvgDiscount FROM Transactions t JOIN CustomerDetails c ON t.CustomerID = c.CustomerID JOIN ProductDetails p ON t.ProductID = p.ProductID JOIN MerchantDetails m ON t.MerchantID = m.MerchantID WHERE c.Location = 'Manchester' AND c.IncomeBracket = 'Medium' AND p.Category = 'Fashion' GROUP BY p.ProductID, p.ItemName, m.MerchantName ORDER BY QuantitySold DESC;"
}

export default mockResponse;
