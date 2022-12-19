# App delivery API

- This API allows you to register two types of user.
- Clients can create deliveries.
- Deliverymen can assign delivery to their user and finalize delivery.

## EndPoits:

> ### POST /client

- body parameters:
  ```json
  {
    "username": "userexemple",
    "password": "123456"
  }
  ```
- responses:
  ```json
  // 201:
  {
    "id": "fc52cd9e-25dc-4dfb-a4fa-a04fa3273fb7",
    "username": "userexemple"
  }
  ```

---

> ### POST /client/authenticate

- Body parameters:
  ```json
  {
    "username": "userexemple",
    "password": "123456"
  }
  ```
- responses:

  ```json
    // 200
    {
      "token": "eyJhbGciOiJIUzI1NiIs..."
    }

    // 400
    {
      "message": "Username or password invalid!"
    }
  ```

---

> ### GET /client/deliveries | authenticated

- responses:
  ```json
  // 200
  [
    {
      "id": "d4bd217d-50e2-4143-8cc4-7693825d28ef",
      "username": "userexemple",
      "deliveries": [
        {
          "id": "f6ad3a02-cbb6-4fc1-a185-2289029c5a25",
          "item_name": "Item exemple 01"
        },
        {
          "id": "29daa64d-22a8-4796-bea8-7911eebca714",
          "item_name": "Item exemple 02"
        }
      ]
    }
  ]
  ```

---

> ### POST /delivery | authenticated

- Body parameters:
  ```json
  {
    "item_name": "New delivery"
  }
  ```
- responses:
  ```json
  // 201
  {
    "id": "34a764f2-00fe-4a8f-992e...",
    "item_name": "New delivery",
    "id_client": "d4bd217d-50e2-4143-8cc4...",
    "id_deliveryman": null,
    "created_at": "2022-12-18T21:22:26.359Z",
    "end_at": null
  }
  ```

---

> ### GET /delivery/available | authenticated

- responses:
  ```json
  // 200
  [
    {
      "id": "29daa64d-22a8-4796-bea8-7911eebca714",
      "item_name": "Item exemple",
      "id_client": "d4bd217d-50e2-4143-8cc4-7693825d28ef",
      "id_deliveryman": null,
      "created_at": "2022-12-18T21:14:51.982Z",
      "end_at": null
    }
  ]
  ```

---

> ### POST /deliveryman

- Body parameters:
  ```json
  {
    "username": "deliveryman",
    "password": "123456"
  }
  ```
- responses:
  ```json
  // 201
  {
    "id": "d5faf924-df13-4a7d-a65b-555d89fbe816",
    "username": "deliveryman"
  }
  ```

---

> ### POST /deliveryman/authenticate

- Body parameters:
  ```json
  {
    "username": "deliveryman",
    "password": "123456"
  }
  ```
- responses:

  ```json
    // 200
    {
      "token": "eyJhbGciOiJIUzI1NiIs..."
    }

    // 400
    {
      "message": "Username or password invalid!"
    }
  ```

---

> ### GET /deliveryman/deliveries | authenticated

- responses:
  ```json
  // 200
  [
    {
      "id": "d5faf924-df13-4a7d-a65b-555d89fbe816",
      "username": "deliveryman",
      "deliveries": [
        {
          "id": "34a764f2-00fe-4a8f-992e-7457ce24ecef",
          "item_name": "New item"
        }
      ]
    }
  ]
  ```
  ***

> ### PUT /delivery/updateDeliveryman/:id_delivery | authenticated

- responses:

  ```json
  // 200
  {
    "id": "29daa64d-22a8-4796-bea8-7911eebca714",
    "item_name": "Item exemple",
    "id_client": "d4bd217d-50e2-4143-8cc4-7693825d28ef",
    "id_deliveryman": "af3c516c-1810-4528-a2ad-b2f292d54616",
    "created_at": "2022-12-18T21:14:51.982Z",
    "end_at": null
  }
  ```

  ***

  > ### PUT /delivery/updateEndDate/:id_delivery | authenticated

- responses: 200

Developed with ❤ by [@brhcastro](https://www.brhcastro.com.br/)
