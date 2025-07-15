const mockResponse = {
  "chatResponse": "Here are the top electronics products purchased by customers under 25 using debit cards, mostly sold by large merchants.",
  "tabularData": [
    {"ProductID": "P001", "ItemName": "Wireless Headphones", "MerchantName": "TechZone", "QuantitySold": 320, "AvgDiscount": "10%"},
    {"ProductID": "P002", "ItemName": "Smartwatch", "MerchantName": "GadgetMart", "QuantitySold": 280, "AvgDiscount": "12%"}
  ],
  "sqlQuery": "SELECT p.ProductID, p.ItemName, m.MerchantName, SUM(t.Quantity) AS QuantitySold, AVG(t.DiscountApplied) AS AvgDiscount FROM Transactions t JOIN CustomerDetails c ON t.CustomerID = c.CustomerID JOIN ProductDetails p ON t.ProductID = p.ProductID JOIN MerchantDetails m ON t.MerchantID = m.MerchantID WHERE c.Age < 25 AND t.PaymentMethod = 'Debit Card' AND p.Category = 'Electronics' GROUP BY p.ProductID, p.ItemName, m.MerchantName ORDER BY QuantitySold DESC LIMIT 5;"
}

export default mockResponse;
