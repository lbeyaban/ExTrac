const {
    ObjectId
} = require('mongodb');
const helper = require('../helper');
const { json } = require('express');

module.exports = {


    dersEkle: async (dersAdi, dersAciklamasi, dersiAlabilenSiniflar , konular) => {

        try {

            if(dersiAlabilenSiniflar != null && typeof dersiAlabilenSiniflar == "string"){

                dersiAlabilenSiniflar = JSON.parse(dersiAlabilenSiniflar)

            }  

            console.log("Type of : " , typeof konular);

            if(typeof konular == "string"){

                konular = JSON.parse(konular)

            }

            if (dersAdi == "" || dersAciklamasi == "" || dersiAlabilenSiniflar == null || konular == null) {

                synErr = {

                    error: 1,
                    message: "Alanların Hepsi Dolu Olmalı"

                }

                return synErr

            }

            const ders = {

                dersAdi: dersAdi,
                dersAciklamasi: dersAciklamasi,
                dersiAlabilenSiniflar: dersiAlabilenSiniflar,
                konular: konular

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

    },

    ogretmenEkle: async (adSoyad, email, gsm, verdigiDersler, sozlesmeBaslangic, sozlesmeBitis, diploma, cinsiyet) => {

        try {

            const ogretmen = {

                adSoyad: adSoyad,
                email: email,
                gsm: gsm,
                verdigiDersler: verdigiDersler,
                sozlesmeBaslangic: sozlesmeBaslangic,
                sozlesmeBitis: sozlesmeBitis,
                diploma: diploma,
                cinsiyet: cinsiyet

            }

            let rs = await helper.mongoHelper.insertObject(ogretmen, "Quiz", "Teachers")

            rs.message = "Öğretmen başarılı bir şekilde eklendi."

            return rs

        } catch (error) {

            resErr = {

                error: 1,
                message: error.message

            }

            return resErr

        }




    },

    konuEkle: async (dersler, konular) => {

        try {

            konular = konular.split(',');

            for (let index = 0; index < dersler.length; index++) {

                const element = dersler[index];

                await helper.mongoHelper.updateOneField(new ObjectId(element), "konular", konular, "Quiz", "Lessons")

            }

            let rs = {

                message: "Konu veya konular başarılı bir şekilde eklendi"

            }

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