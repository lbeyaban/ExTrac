const helper = require('../helper');
const bcrypt = require('bcryptjs')

module.exports = {


        addExam: async (sinavAdi, sinavAciklama, sinavSuresi, sinavZamani, sinavKonulari, sinif, aktif, dersAdi , sinavSorulari) => {

            try {

                const exam = {

                    sinavAdi: sinavAdi,
                    sinavAciklama: sinavAciklama,
                    sinavSuresi: sinavSuresi,
                    sinavZamani: sinavZamani,
                    sinavKonulari: sinavKonulari,
                    sinif: sinif,
                    aktif: aktif,
                    dersAdi: dersAdi,
                    sinavSorulari: sinavSorulari

                }

                let rs = await helper.mongoHelper.insertObject(user, "Quiz", "QuizHeaders")

                rs.messages = "Sınav Basarili Bir Sekilde Eklendi"

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