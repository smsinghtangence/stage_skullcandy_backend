module.exports = {
    schema: {
      kind: "collectionType",
      collectionName: "transactions",
      info: {
        singularName: "transaction",
        pluralName: "transactions",
        displayName: "PayU Transactions",
        description: ""
      },
      options: {
        draftAndPublish: false,
      },
      pluginOptions: {
        'content-manager': { visible: true },
        'content-type-builder': { visible: false }
      },
      "attributes": {
        uid: { type: "string" },
        configurationMode: { 
          type: "enumeration", 
          enum: ["sandbox", "production"], 
        },
        customerIp: { type: "string" },
        description: { type: "string" },
        currencyCode: { type: "string" },
        totalAmount: { type: "string" },  // 1.15 is given as "115"
        buyer: { type: "json" },
        products: { type: "json" },
        status: {
          type: "enumeration",
          enum: [
            "CREATED",
            "NEW",
            "PENDING",
            "COMPLETED",
            "CANCELED",
            "WAITING_FOR_CONFIRMATION",
          ],
          default: "CREATED",
        },
        redirectUri: { type: "string" },
        orderId: { type: "string" },         // order id on PayU side
        payMethod: { type: "json" },
        properties: { type: "json" },
      } 
    }
  }