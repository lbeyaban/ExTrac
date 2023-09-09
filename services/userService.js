const helper = require('../helper');
const qs = require('qs')
const bcrypt = require('bcryptjs')
const passport = require('passport')

module.exports = {


        register: async (ad, email, sifre, sinif, yetki, sube) => {

            try {

                const hashSifre = await bcrypt.hash(sifre, 10);

                const user = {

                    ad: ad,
                    email: email,
                    sifre: hashSifre,
                    sinif: sinif,
                    yetki: yetki,
                    sube: sube

                }

                let rs = await helper.mongoHelper.insertObject(user, "Quiz", "Users")

                rs.messages = "Kullanıcı Basarili Bir Sekilde Eklendi"

                return rs

            } catch (error) {

                resErr = {

                    error: 1,
                    messages: error.message

                }

                return resErr

            }

        }


    }