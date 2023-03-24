/** @format */

export const checkPayment = async (req: Request, res: Response) => {
  try {
    // name: "Test Cards",
    // number: "5188513618552975",
    // cvv: "123",
    // expiry_month: "09",
    // expiry_year: "30",
    // pin: "1234",
    const getWallet: any = await adminWalletModel.findById(req.params.id);
    console.log(getWallet);
    const getRegisterAdmin = await adminAuth.findById(getWallet?._id);
    interface IData {
      amount: number;
    }

    const { amount, name, number, cvv, pin, expiry_year, expiry_month } =
      req.body;

    const paymentData = {
      reference: uuid(), // must be at least 8 chara
      card: {
        name: "Test Cards",
        number: "5188513618552975",
        cvv: "123",
        expiry_month: "09",
        expiry_year: "30",
        pin: "1234",
      },
      amount,
      currency: "NGN",
      redirect_url: "https://merchant-redirect-url.com",
      customer: {
        name: "John Doe",
        email: "johndoe@korapay.com",
      },
      metadata: {
        internalRef: "JD-12-67",
        age: 15,
        fixed: true,
      },
    };

    const stringData = JSON.stringify(paymentData);
    const bufData = Buffer.from(stringData, "utf-8");
    const encryptedData = encryptAES256(encrypt, bufData);

    var config = {
      method: "post",
      maxBodyLength: Infinity,
      url: urlData,
      headers: {
        Authorization: `Bearer ${secretKey}`,
      },
      data: {
        charge_data: `${encryptedData}`,
      },
    };

    axios(config)
      .then(async function (response) {
        console.log(response);

        if (response?.data?.status === true) {
          await adminWalletModel.findByIdAndUpdate(req.params.id, {
            balance: Number(amount + getWallet?.balance),
          });

          const createHisorySender = await adminTransactionHistory.create({
            message: `an amount of ${amount} has been credited to your wallet`,
            transactionType: "credit",
            // transactionReference: "12345",
          });

          getRegisterAdmin?.transactionHistory?.push(
            new mongoose.Types.ObjectId(createHisorySender?._id),
          );

          return res.status(200).json({
            message: `an amount of ${amount} has been added`,
            data: {
              paymentInfo: amount,
              paymentData: JSON.parse(JSON.stringify(response.data)),
            },
          });
        } else {
          return res.status(404).json({
            message: "failed transaction",
          });
        }

        // return res.status(201).json({
        //   message: "done",
        //   data: JSON.parse(JSON.stringify(response.data)),
        // });
      })
      .catch(function (error) {
        console.log(error);
      });
  } catch (error) {
    console.log(error);
  }
};
