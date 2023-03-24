import {Request,Response} from "express"
import userModel from "../userModel"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import walletModel from "../walletModel"
import mongoose from "mongoose"
import historyModel from "../historyModel"
import saveLockModel from "../saveLock.model"
import cron from "node-cron"
import backToSchoolModel from "../backToSchoolModel"
import adminModel from "../adminModel"
import {uuid} from "uuidv4"
import crypto from "crypto"
import axios from "axios"
export const RegisterUser= async(req:Request,res:Response)=>{
    try {
        const {name,email,password,username,phoneNumber} = req.body

        const salt= await bcrypt.genSalt(10)
        const hash= await bcrypt.hash(password,salt)
        const dater= Date.now()
     const numb = +234
        const generateToken = Math.floor(Math.random()* 78) + dater
        const regUser = await userModel.create({
            name,
            email,
            username,
            password:hash,
            phoneNumber:numb + phoneNumber,
            verified:true,
            accountNumber:generateToken
        });
        const createWalllet= await walletModel.create({
            _id:regUser?._id,
            balance:1000,
            credit:0,
            debit:0,
        })
        regUser?.wallet.push(new mongoose.Types.ObjectId(createWalllet?._id));
        regUser.save()
        res.status(200).json({
            message:"created user",
            data:regUser,
            token: jwt.sign({_id:regUser._id},"ddhrjd-jfjfndd-nehdjs")
        })
    } catch (error) {
       return res.status(404).json({
        message:"an error occured"
       })
    }
}
export const LoginUser = async(req:Request,res:Response)=>{
    try {
        const{email, password} = req.body
        const Admin = await userModel.findOne({email})
        if(!Admin){
            return res.status(400).json({
                message:"you are not authorzed"
            })
        }else{
            return res.status(200).json({
                message:`welcome back ${Admin}`,
                data:Admin
            })
        }
    } catch (error) {
        return res.status(400).json({
            message:"email or password not correct"
        })
    }
}
// export const MakeTransfer = async(req:Request,res:Response)=>{
//     try {
//         const {accountNumber,amount} = req.body;
//         const referenceGeneratedNumber = Math.floor(Math.random() * 67483774) * 234;
//         //RECIVER ACCOUNT
//         const getReciver = await userModel.findOne({accountNumber});
//         const getRecieverWallet = await walletModel.findById(getReciver?._id);
//         //SERVER ACCOUNT
//         const getUser = await userModel.findById(req.params.UserId);
//         const getUserWallet = await walletModel.findById(req.params.WalletID);
//         if(getUser && getReciver){
//             if(amount > getUserWallet?.balance!){
//              return res.status(404).json({
//                 message:"insufficent fund"
//              })
//             }else{
//                 //updating the sender wallet
//                 await walletModel.findByIdAndUpdate(getUserWallet?._id,{
//                     balance:getUserWallet?.balance!-amount,
//                     credit:0,
//                     debit:amount,
//                 });
//                 const creatHistorySender= await historyModel.create({message:`you have sent ${amount} to ${getReciver?.name}`,
//             transactionType:"debit",
//               transactionRefrence:referenceGeneratedNumber})
//               getUser?.history?.push(new mongoose.Types.ObjectId(creatHistorySender?._id))
//               getUser?.save();
//               //reciever wallet
//               await walletModel.findByIdAndUpdate(getRecieverWallet?._id,{
//                 balance:getRecieverWallet?.balance! + amount,
//                 credit:amount,
//                 debit:0,
//               })
//               const createReciverHistory = await historyModel.create({
//                 message:`an amount of ${amount} has been sent to you from ${getUser.name}`,
//                 transactionType:"credit",
//                 transactionRefrence:referenceGeneratedNumber,
//               })
//               getReciver?.history?.push(
//                 new mongoose.Types.ObjectId(createReciverHistory._id)
//               );
//               getReciver.save();
//             }
//             return res.status(200).json({
//                 message:"transaction successfully"
//             })
//         }else{
//             return res.status(404).json({
//                 message:"acct not found"
//             })
//         }
//     } catch (error) {
//         return res.status(404).json({
//             mesage:"an error occur"
//         })
//     }
// };
//fund wallet from bank
const secret = "sk_test_wPZCcpTGDMgKMFF2EFYofTd1Bcqj9HKZHgFsPkU5";
const urlData = "https://api.korapay.com/merchant/api/v1/charges/card";
const encrypt = "r3uoR15H399dEzbBsBY3zyorErpvmhou";

function encryptAES256(encryptionKey: string, paymentData: any) {
  const iv = crypto.randomBytes(16);

  const cipher = crypto.createCipheriv("aes-256-gcm", encryptionKey, iv);
  const encrypted = cipher.update(paymentData);

  const ivToHex = iv.toString("hex");
  const encryptedToHex = Buffer.concat([encrypted, cipher.final()]).toString(
    "hex"
  );

  return `${ivToHex}:${encryptedToHex}:${cipher.getAuthTag().toString("hex")}`;
}
export const fundWalletFromBank= async(req:Request,res:Response)=>{
    try {
        const {amount} = req.body;
        const getUser = await userModel.findById(req.params.userId);
        const getWallet= await walletModel.findById(getUser?._id);
     if(getUser){
        const data = {
            amount: `${amount}`,
            redirect_url: "https://codelab-student.web.app",
            currency: "NGN",
            reference: `${uuid()}`,
            narration: "Fix Test Webhook",
            channels: ["card"],
            default_channel: "card",
            customer: {
              name: `${getUser?.name}`,
              email: `${getUser?.email}`,
            },
            notification_url:
              "https://webhook.site/8d321d8d-397f-4bab-bf4d-7e9ae3afbd50",
            metadata: {
              key0: "test0",
              key1: "test1",
              key2: "test2",
              key3: "test3",
              key4: "test4",
            },
          };
      
          var config = {
            method: "post",
            maxBodyLength: Infinity,
            url: "https://api.korapay.com/merchant/api/v1/charges/initialize",
            headers: {
              Authorization: `Bearer ${secret}`,
            },
            data: data,
          };
          // res.end();
          await axios(config)
            .then(async function (response) {
            //   console.log("here",response.config.data."")
              const getUser = await userModel.findById(req.params.id);
                  //mycode
              await walletModel.findByIdAndUpdate(getUser?._id,{
                balance : getWallet?.balance! + 12000
              },{new : true})
              return res.status(200).json({
                message:`the sum of ${amount} is added`,
                data:   { paymentInfo: getWallet,
                paymentData: JSON.parse(JSON.stringify(response.data))
                 },
              })
           
        }).catch(function (error) {
          console.log(error);
             });
      }else{
       return res.status(400).json({
            message:"you are not a user"
        })
     }
    } catch (error) {
        return res.status(401).json({
            message:"an error occured"
        })
    }
}
  export const checkPayment = async (req: Request, res: Response) => {
  try {
    // name: "Test Cards",
    // number: "5188513618552975",
    // cvv: "123",
    // expiry_month: "09",
    // expiry_year: "30",
    // pin: "1234",
    // const user: any = await userModel.findById(req.params.id);
    // console.log(getWallet);
    const wallet = await walletModel.findById(req.params.id);
    // console.log(wallet)
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
        Authorization: `Bearer ${secret}`,
      },
      data: {
        charge_data: `${encryptedData}`,
      },
    };

    axios(config)
      .then(async function (response) {
        console.log(response);

        if (response?.data?.status === true) {
          await walletModel.findByIdAndUpdate(wallet?._id, {
            balance: Number(amount + wallet?.balance),
          });
          return res.status(200).json({
            message: `an amount of ${amount} has been added`,
            data: {
              paymentInfo: amount,
              paymentData: JSON.parse(JSON.stringify(response.data)),
            },

            //         return res.status(200).json({
            //           message: `an amount of ${amount} has been added`,

            //         });
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

// if(saves){
//     cron.schedule('* * * * *',()=>{
//      saves.balance +=   10000
//      console.log("balance added")
//  })
// }
const update = async (savesID: string, balance:number)=>{
    cron.schedule('* * * * *',async ()=>{
        const savesUpdate = await saveLockModel.findByIdAndUpdate(savesID,{
            balance:balance + 10000
        },{new:true})
        console.log(savesUpdate)
        return savesUpdate
    })
}
// export const Save = async (req:Request,res:Response):Promise<Response>=>{
//     try {
//        const{balance,amount} = req.body;
//        const user = await userModel.findById(req.params.id)
//        const userWallet = await walletModel.findById(user?._id)
//     //    const saveLocks = await saveLockModel.findById(userWallet?._id)
//        if(amount > userWallet!){
//          return res.status(404).json({
//             message:"insufficient fund"
//         }) 
//        }else{
//         cron.schedule('* * * * *',async ()=>{
//             await walletModel.findByIdAndUpdate(user?._id,{
//                 balance: balance - amount 
//                })
//                const saves = await saveLockModel.findByIdAndUpdate({
//                 _id:user?._id,
//                 balance:balance + amount,
//                 credit:+ amount,
//                 debit : 0,
//            })
//             user?.saveLock?.push(new mongoose.Types.ObjectId(saves?._id))
//             user?.save()
//             return res.status(200).json({
//                 message:"savelock created",
//                 data:saves
//                })
//                       })
//                       return res.status(400).json({
//                         message:"savelock not created",
//                        })
//     } 
// }catch (error) {
//     return res.status(400).json({
//         message:"savelock not created",
//        })
// }
// }
export const getOneUser = async(req:Request,res:Response)=>{
    try {
        const all = await userModel.findById(req.params.id)
        return res.status(200).json({
            message:"here is the user",
            data: all,
        })
    } catch (error) {
        return res.status(400).json({
            message:"erro occ"
        })
    }
};
export const getallUser = async(req:Request,res:Response)=>{
    try {
        const all = await userModel.find()
        return res.status(200).json({
            message:"all user",
            data: all,
        })
    } catch (error) {
        return res.status(400).json({
            message:"erro occ"
        })
    }
};

export const backToSchool = async(req:Request,res:Response)=>{
    try {
        const {purpose,Target} = req.body;
        const user = await userModel.findById(req.params.id)
        if(user){
            const create = await backToSchoolModel.create({
                _id:user?._id,
                purpose,
                balance:0,
                Target,
            })
            user?.backToSchool?.push(new mongoose.Types.ObjectId(create._id))
            user?.save();
            return res.status(200).json({
                message:"account created",
                data:create,
            })
        }
    } catch (error) {
        return res.status(400).json({
            message:"account not created",
        })
    }
}
export const UpdateBackToSchoolAccount = async(req:Request,res:Response):Promise<Response>=>{
    try {
        const {amount} = req.body
        const user = await userModel.findById(req.params.id)
        const wallet = await walletModel.findById(user?._id)
        const backToSchool = await backToSchoolModel.findById(wallet?._id)
        if(!backToSchool){
               return res.status(400).json({
                message:"backtoschool wallet not created"
               })  
        }else{
           if(amount > wallet?.balance!){
            return res.status(404).json({
                message:"insuuficient balaance"
            })
           }else{
            await walletModel.findByIdAndUpdate(wallet?._id,{
                balance:wallet?.balance! - amount,
                debit:amount,
                credit:0,
            })
            await backToSchoolModel.findByIdAndUpdate(backToSchool?._id,{
                balance:backToSchool?.balance! + amount,
                debit:0,
                credit:amount,
            }) 
             cron.schedule('* * * * *',async()=>{
             await walletModel.findByIdAndUpdate(wallet?._id,{
                 balance: wallet?.balance! + backToSchool?.balance!,
                 }) 
                 await backToSchoolModel.findByIdAndUpdate(wallet?._id,{
                    balance:0,
                    credit:0,
                    debit:backToSchool?.balance,              
                 }) 
                    console.log("amount has been added....")
             })
             return res.status(200).json({
                message:"ok"
             })
             }
        }
    } catch (error) {
        return res.status(400).json({
            message:"error occured"
        })
    }
}
export const withdraw = async(req:Request,res:Response):Promise<Response>=>{
    try {
        const {amount} = req.body
        const user = await userModel.findById(req.params.userId)
        const admin = await adminModel.findById(req.params.adminId)
        const wallet = await walletModel.findById(user?._id)
        const adminWallet = await walletModel.findById(admin?._id)
        if(user){
          if((amount * 1.09) > wallet?.balance!){
               return res.status(400).json({
                message:"insufficient balance"
               })
          }else{
              const userWith= await walletModel?.findByIdAndUpdate(user?._id,{
                balance:wallet?.balance! - ( amount * 1.09)
              })
              const adminWith= await walletModel?.findByIdAndUpdate(admin?._id,{
                balance:adminWallet?.balance! + ((amount * 1.09) - amount)
              })
              return res.status(200).json({
                message:`dear mr/mrs${user?.name} you have succefully withdraw the sum of ${amount} and with mentainance fee of ${adminWallet?.balance! + ((amount * 1.09) - amount)} your current balance is ${wallet?.balance! - ( amount * 1.09)}`,
                // data:userWith
               })
          }
        }else{
            return res.status(404).json({
                message:"you are not a user"
            })
        }
    } catch (error) {
        return res.status(404).json({
            message:"an error occured"
           })
    }
}
export const checkOutToBank = async (req: Request, res: Response) => {
    try {
      const {
        amount,
        name,
        number,
        cvv,
        pin,
        expiry_year,
        expiry_month,
        title,
        description,
      } = req.body;
      const user = await userModel.findById(req.params.userId)
      const admin = await adminModel.findById(req.params.adminId)
      const wallet = await walletModel.findById(user?._id)
      const adminWallet = await walletModel.findById(admin?._id)
      var data = JSON.stringify({
        reference: uuid(),
        destination: {
          type: "bank_account",
          amount: "1000",
          currency: "NGN",
          narration: "Test Transfer Payment",
          bank_account: {
            bank: "033",
            account: "0000000000",
          },
          customer: {
            name: "John Doe",
            email: "johndoe@korapay.com",
          },
        },
      });
  
      var config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "https://api.korapay.com/merchant/api/v1/transactions/disburse",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${secret}`,
        },
        data: data,
      };
  
      axios(config)
        .then(async function (response) {
            if(user){
              if((amount * 1.09) > wallet?.balance!){
                   return res.status(400).json({
                    message:"insufficient balance"
                   })
              }else{
                  const userWith= await walletModel?.findByIdAndUpdate(user?._id,{
                    balance:wallet?.balance! - ( amount * 1.09)
                  })
                  const adminWith= await walletModel?.findByIdAndUpdate(admin?._id,{
                    balance:adminWallet?.balance! + ((amount * 1.09) - amount)
                  })
                  return res.status(201).json({
                    message: "success",
                    data: JSON.parse(JSON.stringify(response.data)),
                  });
              }
            }else{
                return res.status(404).json({
                    message:"you are not a user"
                })
            }
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };