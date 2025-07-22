const mockResponse ={
  "chatResponse": "In London during 2025, ADL Cash Carry received the most payments with a total of $8,921.82. Following closely behind were Hollister with $8,201.19, Morrison with $6,224.60, and Tesco with $6,125.16. Next received $3,817.51 and Sainsbury received the least with $339.58.\n",
  "sqlQuery": "SELECT\n    r.RetailerName,\n    SUM(t.PaymentAmount) AS TotalPaymentsReceived\n  FROM\n    `gcp-alloydb.curated_sample_data_payments_us.Retailers` AS r\n    INNER JOIN `gcp-alloydb.curated_sample_data_payments_us.Transactions` AS t ON r.RetailerName = t.BeneficiaryName\n  WHERE r.City LIKE '%london%'\n   AND t.PaymentDatetime BETWEEN '2025-01-01' AND '2025-12-31'\n  GROUP BY 1\nORDER BY\n  TotalPaymentsReceived DESC\n",
  "tabularData": [
    {
      "RetailerName": "ADL Cash carry",
      "TotalPaymentsReceived": 8921.82
    },
    {
      "RetailerName": "Hollister",
      "TotalPaymentsReceived": 8201.19
    },
    {
      "RetailerName": "Morrison",
      "TotalPaymentsReceived": 6224.5999999999985
    },
    {
      "RetailerName": "Tesco",
      "TotalPaymentsReceived": 6125.16
    },
    {
      "RetailerName": "Next",
      "TotalPaymentsReceived": 3817.51
    },
    {
      "RetailerName": "Sainsbury",
      "TotalPaymentsReceived": 339.58
    }
  ]
}

export default mockResponse;
