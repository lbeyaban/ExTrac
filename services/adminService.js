const helper = require('../helper');

module.exports = {


        dersEkle: async (dersAdi, dersAciklamasi, dersiAlabilenSiniflar) => {

            try {

                if(dersAdi == "" || dersAciklamasi == "" || dersiAlabilenSiniflar == null){

                    synErr = {

                        error: 1,
                        message : "Alanların Hepsi Dolu Olmalı"
    
                    }
    
                    return synErr

                }

                const ders = {

                    dersAdi: dersAdi,
                    dersAciklamasi: dersAciklamasi,
                    dersiAlabilenSiniflar: dersiAlabilenSiniflar,

                }

                let rs = await helper.mongoHelper.insertObject(ders, "Quiz", "Lessons")

                rs.messages = "Ders Basarili Bir Sekilde Eklendi"

                return rs

            } catch (error) {

                resErr = {

                    error: 1,
                    message: error.message

                }

                return resErr

            }

        }



    }