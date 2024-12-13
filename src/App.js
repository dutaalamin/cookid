import React, { useState, useCallback } from 'react';
import './App.css';

// Data kategori
const categories = [
  {
    id: 'nasi',
    title: 'Nasi & Mie'
  },
  {
    id: 'ayam',
    title: 'Ayam'
  },
  {
    id: 'daging',
    title: 'Daging'
  },
  {
    id: 'seafood',
    title: 'Seafood'  
  },
  {
    id: 'sayur',
    title: 'Sayuran'
  },
  {
    id: 'soto',
    title: 'Soto & Sup'
  },
  {
    id: 'sambal',
    title: 'Sambal'
  },
  {
    id: 'sate',
    title: 'Sate'
  },
  {
    id: 'ikan',
    title: 'Ikan'
  },
  {
    id: 'jajanan', 
    title: 'Jajanan'
  },
];

// Data resep makanan
const recipes = [
  {
    id: 1,
    title: 'Nasi Goreng Spesial',
    category: 'nasi',
    image: 'https://asset.kompas.com/crops/VcgvggZKE2VHqIAUp1pyHFXXYCs=/202x66:1000x599/1200x800/data/photo/2023/05/07/6456a450d2edd.jpg',
    ingredients: [
      '2 piring nasi putih',
      '2 butir telur',
      '3 siung bawang putih',
      '5 siung bawang merah',
      'Kecap manis secukupnya',
      '2 batang daun bawang',
      'Garam dan merica secukupnya'
    ],
    instructions: [
      'Haluskan bawang merah dan bawang putih',
      'Tumis bumbu halus hingga harum',
      'Masukkan telur, buat orak-arik',
      'Masukkan nasi putih',
      'Tambahkan kecap manis, garam, dan merica',
      'Aduk rata hingga matang',
      'Taburi dengan daun bawang iris'
    ]
  },
  {
    id: 2,
    title: 'Rendang Daging',
    category: 'daging',
    image: 'https://asset.kompas.com/crops/QsUYn6p5xK4DsivCrxa0_TXdjuk=/10x36:890x623/1200x800/data/photo/2023/03/25/641e5ef63dea4.jpg',
    time: '4 jam',
    difficulty: 'Sulit',
    ingredients: [
      '1 kg daging sapi',
      'Santan dari 3 butir kelapa',
      '15 siung bawang merah',
      '10 siung bawang putih',
      '20 buah cabai merah',
      '5 cm jahe',
      '5 cm lengkuas',
      '3 batang serai',
      '5 lembar daun jeruk',
      '3 lembar daun salam'
    ],
    instructions: [
      'Haluskan semua bumbu kecuali daun dan serai',
      'Tumis bumbu halus dengan serai dan daun',
      'Masukkan daging sapi, aduk rata',
      'Tuang santan dan masak dengan api kecil',
      'Aduk sesekali hingga santan mengental',
      'Masak terus hingga rendang berwarna cokelat kehitaman',
      'Angkat dan sajikan'
    ]
  },
  {
    id: 3,
    title: 'Soto Ayam',
    category: 'soto',
    image: 'https://asset.kompas.com/crops/yc5vBBn_kny5uxIg5QNuj7Qzx6c=/0x0:1000x667/1200x800/data/photo/2024/03/21/65fbab7732136.jpeg',
    time: '1.5 jam',
    difficulty: 'Sedang',
    ingredients: [
      '1 ekor ayam kampung',
      'Tauge pendek',
      'Bihun',
      'Daun seledri',
      'Bawang goreng',
      'Jeruk nipis',
      'Bumbu halus lengkap',
      'Rempah-rempah'
    ],
    instructions: [
      'Rebus ayam dengan rempah hingga empuk',
      'Tumis bumbu halus hingga harum',
      'Masukkan ke dalam kaldu ayam',
      'Sajikan dengan pelengkap'
    ]
  },
  {
    id: 4,
    title: 'Gado-gado',
    category: 'sayur',
    image: 'https://asset-a.grid.id/crop/0x0:0x0/x/photo/2019/08/29/1093597743.jpg',
    time: '30 menit',
    difficulty: 'Mudah',
    ingredients: [
      'Sayuran rebus lengkap',
      'Tahu goreng',
      'Tempe goreng',
      'Telur rebus',
      'Bumbu kacang',
      'Kerupuk',
      'Lontong'
    ],
    instructions: [
      'Siapkan semua bahan',
      'Buat bumbu kacang',
      'Tata sayuran dan pelengkap',
      'Siram dengan bumbu kacang'
    ]
  },
  {
    id: 5,
    title: 'Sate Ayam',
    category: 'sate',
    image: 'https://asset.kompas.com/crops/BJdOTeUCdwHWS6ImI9qDnf3s8nI=/0x0:1000x667/1200x800/data/photo/2023/12/19/6580e31d4d33e.jpeg',
    time: '1 jam',
    difficulty: 'Sedang',
    ingredients: [
      '500g daging ayam',
      'Bumbu marinasi',
      'Bumbu kacang',
      'Kecap manis',
      'Lontong'
    ],
    instructions: [
      'Potong daging ayam',
      'Marinasi dengan bumbu',
      'Tusuk dengan bambu',
      'Bakar hingga matang',
      'Sajikan dengan bumbu kacang'
    ]
  },
  {
    id: 6,
    title: 'Mie Goreng Jawa',
    category: 'nasi',
    image: 'https://images.tokopedia.net/img/JFrBQq/2023/11/17/9f4811eb-7151-47c5-8b97-aa7717218534.jpg',
    time: '30 menit',
    difficulty: 'Mudah',
    ingredients: [
      'Mie kuning tebal',
      'Sawi hijau',
      'Bakso',
      'Telur',
      'Bawang goreng',
      'Daun bawang',
      'Bumbu halus lengkap',
      'Kecap manis'
    ],
    instructions: [
      'Rebus mie hingga matang',
      'Tumis bumbu halus hingga harum',
      'Masukkan telur, buat orak-arik',
      'Masukkan sayuran dan bakso',
      'Tambahkan mie dan kecap manis',
      'Aduk rata hingga matang'
    ]
  },
  {
    id: 7,
    title: 'Sop Buntut',
    category: 'soto',
    image: 'https://www.unileverfoodsolutions.co.id/dam/global-ufs/mcos/SEA/calcmenu/recipes/ID-recipes/red-meats-&-red-meat-dishes/oxtail-soup/main-header.jpg',
    time: '3 jam',
    difficulty: 'Sulit',
    ingredients: [
      '1 kg buntut sapi',
      'Wortel',
      'Kentang',
      'Daun bawang',
      'Seledri',
      'Bawang putih',
      'Bawang merah',
      'Pala',
      'Merica',
      'Garam'
    ],
    instructions: [
      'Rebus buntut dengan api kecil hingga empuk',
      'Tumis bumbu halus',
      'Masukkan sayuran',
      'Masukkan ke dalam kaldu buntut',
      'Sajikan dengan bawang goreng dan sambal'
    ]
  },
  {
    id: 8,
    title: 'Nasi Uduk',
    category: 'nasi',
    image: 'https://www.blibli.com/friends-backend/wp-content/uploads/2023/04/B300028-Cover-resep-nasi-uduk-scaled.jpg',
    time: '45 menit',
    difficulty: 'Sedang',
    ingredients: [
      'Beras',
      'Santan',
      'Daun salam',
      'Serai',
      'Lengkuas',
      'Bawang merah goreng',
      'Telur dadar',
      'Tempe orek',
      'Sambal kacang'
    ],
    instructions: [
      'Cuci beras hingga bersih',
      'Masak beras dengan santan dan rempah',
      'Kukus hingga matang',
      'Sajikan dengan lauk pelengkap'
    ]
  },
  {
    id: 9,
    title: 'Bakso Malang',
    category: 'bakso',
    image: 'https://asset.kompas.com/crops/LIjgzTN7piXsTTdECd6ycijJTUk=/0x129:1000x796/1200x800/data/photo/2020/03/03/5e5e292daa840.jpg',
    difficulty: 'Sulit',
    ingredients: [
      'Daging sapi giling',
      'Tepung tapioka',
      'Bawang putih',
      'Bawang merah',
      'Mie kuning',
      'Mie bihun',
      'Siomay',
      'Tahu',
      'Daun bawang',
      'Seledri'
    ],
    instructions: [
      'Buat adonan bakso',
      'Bentuk bulat dan rebus',
      'Siapkan kuah kaldu',
      'Rebus mie dan pelengkap',
      'Sajikan dengan sambal'
    ]
  },
  {
    id: 10,
    title: 'Bebek Goreng',
    category: 'bebek',
    image: 'https://asset.kompas.com/crops/GmkkJbQ2It3HSVrC5H-weKWFHxk=/0x52:1000x719/1200x800/data/photo/2020/07/14/5f0d253a6edd5.jpg',
    time: '2 jam',
    difficulty: 'Sedang',
    ingredients: [
      '1 ekor bebek',
      'Bumbu ungkep lengkap',
      'Daun salam',
      'Serai',
      'Lengkuas',
      'Sambal pencit',
      'Lalapan'
    ],
    instructions: [
      'Ungkep bebek dengan bumbu',
      'Goreng hingga kecokelatan',
      'Sajikan dengan sambal pencit',
      'Lengkapi dengan lalapan'
    ]
  },
  {
    id: 11,
    title: 'Nasi Campur Bali',
    category: 'nasi',
    image: 'https://awsimages.detik.net.id/community/media/visual/2023/02/07/nasi-campur-bali-3_169.png?w=1200',
    ingredients: [
      'Nasi putih',
      'Ayam sisit',
      'Urap sayuran',
      'Sambal matah',
      'Telur bumbu merah',
      'Sate lilit',
      'Kacang goreng',
      'Sambal embe'
    ],
    instructions: [
      'Siapkan nasi putih hangat',
      'Tata ayam sisit di atas nasi',
      'Tambahkan urap sayuran',
      'Sajikan dengan sambal matah dan embe',
      'Lengkapi dengan sate lilit dan telur'
    ]
  },
  {
    id: 12,
    title: 'Sate Padang',
    category: 'sate',
    image: 'https://qr.ptsuparmatbk.com/blog/wp-content/uploads/2024/08/sate-padang.webp',
    ingredients: [
      'Daging sapi',
      'Bumbu kacang padang',
      'Ketupat',
      'Bawang goreng',
      'Kerupuk merah',
      'Kecap manis',
      'Cabai merah'
    ],
    instructions: [
      'Potong daging sapi',
      'Tusuk daging dengan bambu',
      'Bakar sate hingga matang',
      'Siram dengan bumbu kacang padang',
      'Taburi bawang goreng'
    ]
  },
  {
    id: 13,
    title: 'Pempek Palembang',
    category: 'pempek',
    image: 'https://lingkar.news/wp-content/uploads/2023/03/Aneka-Resep-Pempek-Makanan-Tradisional-Khas-Palembang.jpg',
    ingredients: [
      'Ikan tenggiri',
      'Tepung sagu',
      'Telur',
      'Bawang putih',
      'Cuka',
      'Ebi',
      'Timun',
      'Kuah cuko'
    ],
    instructions: [
      'Campur ikan dengan tepung',
      'Bentuk sesuai selera',
      'Rebus dalam air mendidih',
      'Goreng hingga kecokelatan',
      'Sajikan dengan kuah cuko'
    ]
  },
  {
    id: 14,
    title: 'Gudeg Yogya',
    category: 'gudeg',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Nasi_Gudeg.jpg/1200px-Nasi_Gudeg.jpg',
    ingredients: [
      'Nangka muda',
      'Telur',
      'Ayam',
      'Santan',
      'Daun jati',
      'Krecek',
      'Areh',
      'Sambal goreng krecek'
    ],
    instructions: [
      'Rebus nangka dengan daun jati',
      'Masak dengan bumbu dan santan',
      'Masak hingga kecokelatan',
      'Sajikan dengan areh',
      'Lengkapi dengan sambal krecek'
    ]
  },
  {
    id: 15,
    title: 'Rawon Surabaya',
    category: 'rawon',
    image: 'https://sanex.co.id/wp-content/uploads/2024/06/resep-rawon-daging-surabaya_43.jpeg',
    ingredients: [
      'Daging sapi',
      'Kluwek',
      'Tauge pendek',
      'Telur asin',
      'Daun bawang',
      'Bawang goreng',
      'Sambal terasi',
      'Jeruk nipis'
    ],
    instructions: [
      'Rebus daging hingga empuk',
      'Tumis bumbu dengan kluwek',
      'Masak hingga kuah hitam pekat',
      'Sajikan dengan tauge dan telur asin',
      'Taburi bawang goreng'
    ]
  },
  {
    id: 16,
    title: 'Rujak Cingur',
    category: 'rujak',
    image: 'https://d1vbn70lmn1nqe.cloudfront.net/prod/wp-content/uploads/2023/07/21044422/cara-membuat-rujak-cingur-sederhana-khas-surabaya.jpg',
    ingredients: [
      'Cingur sapi',
      'Tahu goreng',
      'Tempe goreng',
      'Kangkung',
      'Taoge',
      'Bumbu petis',
      'Kerupuk',
      'Lontong'
    ],
    instructions: [
      'Rebus cingur hingga empuk',
      'Potong sayuran dan goreng tahu tempe',
      'Siapkan bumbu petis',
      'Campur semua bahan',
      'Sajikan dengan kerupuk'
    ]
  },
  {
    id: 17,
    title: 'Soto Banjar',
    category: 'soto',
    image: 'https://www.masakapahariini.com/wp-content/uploads/2019/06/5.jpg',
    ingredients: [
      'Ayam',
      'Bihun',
      'Kentang goreng',
      'Telur',
      'Perkedel',
      'Ketupat',
      'Bawang goreng',
      'Sambal'
    ],
    instructions: [
      'Rebus ayam dengan rempah',
      'Saring kaldu ayam',
      'Susun bihun dan pelengkap',
      'Siram dengan kuah panas',
      'Sajikan dengan sambal'
    ]
  },
  {
    id: 18,
    title: 'Nasi Liwet Solo',
    category: 'nasi',
    image: 'https://asset.kompas.com/crops/TD8hgTdM67ZWgTO4RFItVRCSg5k=/0x12:1000x679/1200x800/data/photo/2021/01/29/60139260888f2.jpg',
    ingredients: [
      'Beras',
      'Santan',
      'Teri medan',
      'Daun salam',
      'Serai',
      'Bawang merah',
      'Bawang putih',
      'Cabai rawit'
    ],
    instructions: [
      'Tumis bumbu dan teri',
      'Masak beras dengan santan',
      'Tambahkan bumbu tumis',
      'Masak hingga matang',
      'Sajikan dengan lauk pendamping'
    ]
  },
  {
    id: 19,
    title: 'Ayam Taliwang',
    category: 'ayam',
    image: 'https://img.kurio.network/iU_q9ETZ3iZ-w6SfPw80coAjVv8=/1200x675/filters:quality(80)/https://kurio-img.kurioapps.com/21/02/16/f247ea21-347b-47cd-b8fa-5bfdaf6a5855.jpe',
    ingredients: [
      'Ayam kampung',
      'Cabai merah',
      'Bawang merah',
      'Bawang putih',
      'Tomat',
      'Terasi',
      'Minyak kelapa',
      'Jeruk limau'
    ],
    instructions: [
      'Haluskan bumbu',
      'Bakar ayam setengah matang',
      'Olesi dengan bumbu',
      'Bakar lagi sampai matang',
      'Sajikan dengan plecing kangkung'
    ]
  },
  {
    id: 20,
    title: 'Ikan Bakar Manokwari',
    category: 'ikan',
    image: 'https://cdn.rri.co.id/berita/66/images/1709454651458-i/pd9h0cazg3b2epb.jpeg',
    ingredients: [
      'Ikan kembung',
      'Cabai rawit',
      'Bawang merah',
      'Bawang putih',
      'Jeruk nipis',
      'Daun jeruk',
      'Minyak kelapa',
      'Garam'
    ],
    instructions: [
      'Bersihkan ikan',
      'Haluskan bumbu sambal',
      'Bakar ikan hingga matang',
      'Olesi dengan sambal',
      'Bakar sebentar lagi'
    ]
  },
  {
    id: 21,
    title: 'Papeda',
    category: 'papeda',
    image: 'https://cdn.antaranews.com/cache/1200x800/2017/05/20170509papeda.jpg.webp',
    ingredients: [
      'Tepung sagu',
      'Air panas',
      'Ikan kuah kuning',
      'Kunyit',
      'Jeruk nipis',
      'Daun jeruk',
      'Serai',
      'Tomat'
    ],
    instructions: [
      'Masak air hingga mendidih',
      'Tuang ke tepung sagu',
      'Aduk hingga mengental',
      'Sajikan dengan kuah kuning',
      'Tambahkan ikan'
    ]
  },
  {
    id: 22,
    title: 'Sop Konro',
    category: 'soto',
    image: 'https://i0.wp.com/resepkoki.id/wp-content/uploads/2017/05/Resep-Sup-Konro.jpg?fit=1893%2C1920&ssl=1',
    ingredients: [
      'Iga sapi',
      'Kluwak',
      'Serai',
      'Kayu manis',
      'Cengkeh',
      'Daun salam',
      'Lengkuas',
      'Bumbu halus'
    ],
    instructions: [
      'Rebus iga hingga empuk',
      'Tumis bumbu halus',
      'Masukkan ke dalam kaldu',
      'Masak hingga meresap',
      'Sajikan dengan buras'
    ]
  },
  {
    id: 23,
    title: 'Ayam Betutu',
    category: 'ayam',
    image: 'https://awsimages.detik.net.id/community/media/visual/2021/08/27/resep-ayam-betutu-gilimanuk_43.jpeg?w=600&q=90',
    ingredients: [
      'Ayam utuh',
      'Base genep',
      'Serai',
      'Daun jeruk',
      'Daun salam',
      'Lengkuas',
      'Minyak kelapa',
      'Daun pisang'
    ],
    instructions: [
      'Haluskan base genep',
      'Lumuri ayam dengan bumbu',
      'Bungkus dengan daun pisang',
      'Kukus hingga matang',
      'Bakar sebentar sebelum disajikan'
    ]
  },
  {
    id: 24,
    title: 'Mie Aceh',
    category: 'nasi',
    image: 'https://www.astronauts.id/blog/wp-content/uploads/2023/10/Resep-Mie-Aceh-Goreng-Simpel-Untuk-Masak-di-Rumah.jpg',
    ingredients: [
      'Mie kuning tebal',
      'Daging sapi',
      'Udang',
      'Kol',
      'Tomat',
      'Bumbu khas Aceh',
      'Kecap',
      'Acar'
    ],
    instructions: [
      'Tumis bumbu hingga harum',
      'Masak daging dan udang',
      'Tambahkan sayuran',
      'Masukkan mie',
      'Sajikan dengan acar'
    ]
  },
  {
    id: 25,
    title: 'Nasi Pecel',
    category: 'nasi',
    image: 'https://asset.kompas.com/crops/Bl583WdJr0__J2epTtcT-4azxOQ=/60x23:959x622/1200x800/data/photo/2020/11/05/5fa3f16d9c1cf.jpg',
    ingredients: [
      'Nasi putih',
      'Sayuran rebus',
      'Bumbu pecel',
      'Kacang tanah',
      'Cabai rawit',
      'Daun jeruk',
      'Tempe goreng',
      'Rempeyek'
    ],
    instructions: [
      'Rebus sayuran hingga matang',
      'Haluskan bumbu pecel',
      'Tata nasi dan sayuran',
      'Siram dengan bumbu pecel',
      'Sajikan dengan pelengkap'
    ]
  },
  {
    id: 26,
    title: 'Lontong Sayur Betawi',
    category: 'lontong',
    image: 'https://asset.kompas.com/crops/wXRUx6JTjnKcbMe54tUHe8MxO2k=/0x86:1000x753/1200x800/data/photo/2021/05/11/6099df69ead68.jpeg',
    ingredients: [
      'Lontong',
      'Labu siam',
      'Kacang panjang',
      'Santan',
      'Telur',
      'Tahu',
      'Bumbu halus',
      'Kerupuk'
    ],
    instructions: [
      'Tumis bumbu halus',
      'Masak sayuran dengan santan',
      'Masukkan tahu dan telur',
      'Masak hingga matang',
      'Sajikan dengan lontong'
    ]
  },
  {
    id: 27,
    title: 'Nasi Kuning',
    category: 'nasi',
    image: 'https://akcdn.detik.net.id/api/wm/2024/06/12/terlihat-sama-5-racikan-nasi-kuning-berbagai-daerah-dengan-lauk-khas-3_169.jpeg',
    ingredients: [
      'Beras',
      'Kunyit',
      'Santan',
      'Serai',
      'Daun salam',
      'Telur dadar',
      'Ayam goreng',
      'Mie goreng'
    ],
    instructions: [
      'Cuci beras hingga bersih',
      'Masak dengan santan dan kunyit',
      'Kukus hingga matang',
      'Siapkan lauk pelengkap',
      'Tata dan sajikan'
    ]
  },
  {
    id: 28,
    title: 'Ketoprak Jakarta',
    category: 'ketoprak',
    image: 'https://www.senibudayabetawi.com/wp-content/uploads/2024/05/2bf3aadc8aaf84a0686f965bf7407f12.jpg',
    ingredients: [
      'Lontong',
      'Tahu',
      'Bihun',
      'Tauge',
      'Bumbu kacang',
      'Kecap manis',
      'Bawang goreng',
      'Kerupuk'
    ],
    instructions: [
      'Goreng tahu',
      'Seduh bihun',
      'Rebus tauge',
      'Siapkan bumbu kacang',
      'Tata dan sajikan'
    ]
  },
  {
    id: 29,
    title: 'Sate Lilit Bali',
    category: 'sate',
    image: 'https://img-global.cpcdn.com/recipes/bdf771ef73782177/400x400cq70/photo.jpg',
    ingredients: [
      'Ikan tengiri',
      'Kelapa parut',
      'Base genep',
      'Serai',
      'Daun jeruk',
      'Santan',
      'Garam',
      'Sambal matah'
    ],
    instructions: [
      'Haluskan ikan',
      'Campur dengan kelapa dan bumbu',
      'Lilit pada batang serai',
      'Bakar hingga matang',
      'Sajikan dengan sambal matah'
    ]
  },
  {
    id: 30,
    title: 'Nasi Tumpeng',
    category: 'nasi',
    image: 'https://awsimages.detik.net.id/community/media/visual/2019/08/16/dd3c93fc-1901-4134-bbd9-7329ee521bf3.jpeg?w=600&q=90',
    ingredients: [
      'Beras',
      'Kunyit',
      'Santan',
      'Ayam goreng',
      'Telur balado',
      'Urap sayuran',
      'Ikan teri',
      'Sambal'
    ],
    instructions: [
      'Masak nasi kuning',
      'Cetak berbentuk kerucut',
      'Siapkan lauk pauk',
      'Tata mengelilingi tumpeng',
      'Hias dengan garnish'
    ]
  },
  {
    id: 31,
    title: 'Soto Lamongan',
    category: 'soto',
    image: 'https://www.masakapahariini.com/wp-content/uploads/2019/11/shutterstock_1469046305.jpg',
    ingredients: [
      'Ayam kampung',
      'Koya',
      'Soun',
      'Telur',
      'Kol',
      'Tauge',
      'Seledri',
      'Bumbu halus'
    ],
    instructions: [
      'Rebus ayam',
      'Tumis bumbu halus',
      'Masak kuah soto',
      'Sajikan dengan pelengkap',
      'Taburi koya'
    ]
  },
  {
    id: 32,
    title: 'Nasi Bakar',
    category: 'nasi',
    image: 'https://img.kurio.network/9z6sq599FudjQd5OFOoxY58ujZ0=/1200x1200/filters:quality(80)/https://kurio-img.kurioapps.com/21/02/19/76964a16-13d7-49d1-8dcd-65193063ce28.jpe',
    ingredients: [
      'Nasi putih',
      'Ayam suwir',
      'Kemangi',
      'Cabai rawit',
      'Daun pisang',
      'Serai',
      'Daun salam',
      'Bumbu halus'
    ],
    instructions: [
      'Tumis bumbu halus',
      'Campur dengan ayam suwir',
      'Tambahkan kemangi',
      'Bungkus dengan daun pisang',
      'Bakar hingga harum'
    ]
  },
  {
    id: 33,
    title: 'Sop Buntut',
    category: 'sop',
    image: 'https://www.unileverfoodsolutions.co.id/dam/global-ufs/mcos/SEA/calcmenu/recipes/ID-recipes/red-meats-&-red-meat-dishes/oxtail-soup/main-header.jpg',
    ingredients: [
      'Buntut sapi',
      'Wortel',
      'Kentang',
      'Buncis',
      'Tomat',
      'Daun bawang',
      'Seledri',
      'Bumbu sop'
    ],
    instructions: [
      'Rebus buntut hingga empuk',
      'Tumis bumbu sop',
      'Masukkan sayuran',
      'Masak hingga matang',
      'Sajikan dengan emping'
    ]
  },
  {
    id: 35,
    title: 'Opor Ayam',
    category: 'opor',
    image: 'https://www.sasa.co.id/medias/page_medias/shutterstock_1968888214_(1)_(1).jpg'
  },
  {
    id: 36,
    title: 'Sayur Asem',
    category: 'sayur',
    image: 'https://www.masakapahariini.com/wp-content/uploads/2023/03/shutterstock_2102970676.jpg'
  },
  {
    id: 37,
    title: 'Gulai Kepala Ikan',
    category: 'gulai',
    image: 'https://img-global.cpcdn.com/recipes/2d402f7844250193/400x400cq70/photo.jpg',
    ingredients: [
      'Kepala ikan kakap',
      'Santan kental',
      'Daun kunyit',
      'Daun jeruk',
      'Serai',
      'Asam kandis',
      'Cabe rawit',
      'Bumbu gulai'
    ],
    instructions: [
      'Bersihkan kepala ikan',
      'Tumis bumbu gulai',
      'Masukkan santan',
      'Masak hingga kuah mengental',
      'Sajikan dengan nasi'
    ]
  },
  {
    id: 38,
    title: 'Ayam Pop',
    category: 'ayam',
    image: 'https://img-global.cpcdn.com/recipes/1a4d2a1814e785c9/400x400cq70/photo.jpg',
    ingredients: [
      'Ayam kampung',
      'Air kelapa',
      'Bawang putih',
      'Jahe',
      'Garam',
      'Daun salam',
      'Daun jeruk',
      'Sambal cabe hijau'
    ],
    instructions: [
      'Rebus ayam dengan air kelapa',
      'Masukkan bumbu dan rempah',
      'Goreng sebentar',
      'Sajikan dengan sambal hijau',
      'Taburi bawang goreng'
    ]
  },
  {
    id: 40,
    title: 'Nasi Goreng Kambing',
    category: 'nasi',
    image: 'https://akcdn.detik.net.id/visual/2024/06/14/resep-nasi-goreng-kambingfoto-freepikcomnugrahithaaditya.jpeg?w=480&q=90',
    ingredients: [
      'Nasi putih',
      'Daging kambing',
      'Kari bubuk',
      'Bawang merah',
      'Bawang putih',
      'Cabai',
      'Kecap manis',
      'Acar'
    ],
    instructions: [
      'Tumis bumbu halus',
      'Masukkan daging kambing',
      'Tambahkan nasi',
      'Beri kari bubuk',
      'Sajikan dengan acar'
    ]
  },
  {
    id: 41,
    title: 'Sate Maranggi',
    category: 'sate',
    image: 'https://asset-2.tstatic.net/palembang/foto/bank/images/Resep-Sate-Maranggi-Pakai-Sambal-Tomat-Dijamin-Bikin-Nagih-dan-Mudah-Dimasak-Sendiri-di-Rumah.jpg',
    ingredients: [
      'Daging sapi',
      'Kecap manis',
      'Bumbu maranggi',
      'Bawang merah',
      'Tomat',
      'Cabai rawit',
      'Kecap',
      'Acar'
    ],
    instructions: [
      'Potong daging kotak',
      'Marinasi dengan bumbu',
      'Tusuk dengan bambu',
      'Bakar hingga matang',
      'Sajikan dengan sambal'
    ]
  },
  {
    id: 42,
    title: 'Es Cendol',
    category: 'jajanan',
    image: 'https://asset.kompas.com/crops/t3tdD3PwNMMiPxm7WKH-_qq4MmM=/0x0:1000x667/1200x800/data/photo/2023/03/12/640d6eac51567.jpg',
    ingredients: [
      'Tepung hunkwe',
      'Daun pandan',
      'Gula merah',
      'Santan',
      'Daun pandan',
      'Es batu',
      'Garam'
    ],
    instructions: [
      'Buat cendol dari tepung hunkwe',
      'Rebus gula merah untuk sirup',
      'Masak santan dengan pandan',
      'Susun dalam gelas',
      'Sajikan dengan es batu'
    ]
  },
  {
    id: 43,
    title: 'Sambal Terasi',
    category: 'sambal',
    image: 'https://asset.kompas.com/crops/T5tcZX2QbELoIvtZeyVXOIq_KZI=/0x0:1000x667/1200x800/data/photo/2023/07/06/64a628ed595eb.jpeg',
    ingredients: [
      'Cabai merah',
      'Cabai rawit',
      'Terasi',
      'Bawang merah',
      'Bawang putih',
      'Tomat',
      'Gula',
      'Garam'
    ],
    instructions: [
      'Goreng semua bahan',
      'Haluskan bahan',
      'Tumis sambal',
      'Masak hingga matang',
      'Sajikan'
    ]
  },
  {
    id: 44,
    title: 'Klepon',
    category: 'jajanan',
    image: 'https://asset.kompas.com/crops/id00fXg3O-KSHVUvmza9m-wIF8Q=/32x0:1000x645/1200x800/data/photo/2023/09/08/64fa7899edc0b.jpeg',
    ingredients: [
      'Tepung ketan',
      'Tepung beras',
      'Gula merah',
      'Kelapa parut',
      'Daun pandan',
      'Air',
      'Garam',
      'Pewarna hijau'
    ],
    instructions: [
      'Campur tepung dengan air pandan',
      'Isi dengan gula merah',
      'Bentuk bulat-bulat',
      'Rebus hingga mengapung',
      'Gulingkan di kelapa parut'
    ]
  },
  {
    id: 45,
    title: 'Kepiting Saus Padang',
    category: 'seafood',
    image: 'https://cdn0-production-images-kly.akamaized.net/AV-6PnSA9L6nNUqpi5EGoyyp0BE=/800x450/smart/filters:quality(75):strip_icc():format(webp)/kly-media-production/medias/2355329/original/078016000_1536562953-resep-masakan-sehari-hari.jpg',
    ingredients: [
      'Kepiting',
      'Jagung manis',
      'Daun bawang',
      'Saus padang',
      'Saus tiram',
      'Saus tomat',
      'Bumbu halus',
      'Daun jeruk'
    ],
    instructions: [
      'Bersihkan kepiting',
      'Tumis bumbu halus',
      'Masukkan saus-saus',
      'Masak hingga meresap',
      'Tambahkan daun bawang'
    ]
  },
  {
    id: 46,
    title: 'Sayur Lodeh',
    category: 'sayur',
    image: 'https://img.kurio.network/GtqXOVino31IDtz4lWUvwchMpqg=/1200x675/filters:quality(80)/https://kurio-img.kurioapps.com/21/12/20/f712a185-de62-4365-a4a4-6d218b798158.jpe',
    ingredients: [
      'Nangka muda',
      'Kacang panjang',
      'Terong',
      'Santan',
      'Tempe',
      'Daun salam',
      'Lengkuas',
      'Bumbu halus'
    ],
    instructions: [
      'Rebus nangka hingga empuk',
      'Tumis bumbu halus',
      'Masukkan santan',
      'Tambahkan sayuran',
      'Masak hingga matang'
    ]
  },
  {
    id: 47,
    title: 'Serabi Solo',
    category: 'jajanan',
    image: 'https://awsimages.detik.net.id/community/media/visual/2021/04/14/serabi-solo-kreasi-sasa.jpeg?w=600&q=90',
    ingredients: [
      'Tepung beras',
      'Santan',
      'Ragi instan',
      'Gula pasir',
      'Garam',
      'Daun pandan',
      'Vanili',
      'Areh'
    ],
    instructions: [
      'Campur semua bahan',
      'Diamkan adonan',
      'Tuang ke cetakan',
      'Masak dengan api kecil',
      'Siram dengan areh'
    ]
  },
  {
    id: 48,
    title: 'Cumi Hitam',
    category: 'seafood',
    image: 'https://www.finnafood.com/blog/wp-content/uploads/2023/09/27.-Cara-Masak-Cumi-Hitam-Sambal-Ijo.jpg',
    ingredients: [
      'Cumi-cumi',
      'Bawang merah',
      'Bawang putih',
      'Cabai',
      'Daun jeruk',
      'Serai',
      'Jahe',
      'Tinta cumi'
    ],
    instructions: [
      'Bersihkan cumi',
      'Tumis bumbu halus',
      'Masukkan cumi',
      'Masak dengan tintanya',
      'Sajikan hangat'
    ]
  },
  {
    id: 49,
    title: 'Soto Betawi',
    category: 'soto',
    image: 'https://lezatpedia.id/wp-content/uploads/2023/07/preview-image-scaled.webp',
    ingredients: [
      'Daging sapi',
      'Santan',
      'Tomat',
      'Kentang',
      'Daun bawang',
      'Seledri',
      'Jeruk limau',
      'Emping'
    ],
    instructions: [
      'Rebus daging hingga empuk',
      'Tumis bumbu halus',
      'Masukkan santan',
      'Masak hingga mendidih',
      'Sajikan dengan pelengkap'
    ]
  },
  {
    id: 50,
    title: 'Bubur Manado',
    category: 'bubur',
    image: 'https://asset.kompas.com/crops/GZP1r3C5qNg_J8bgVzQtupnPoBs=/81x22:892x563/1200x800/data/photo/2020/05/13/5ebbdec618a37.jpg',
    ingredients: [
      'Beras',
      'Jagung manis',
      'Bayam',
      'Labu kuning',
      'Kangkung',
      'Kemangi',
      'Ikan asin',
      'Sambal dabu-dabu'
    ],
    instructions: [
      'Masak beras hingga menjadi bubur',
      'Tambahkan jagung dan labu',
      'Masukkan sayuran',
      'Beri ikan asin',
      'Sajikan dengan sambal'
    ]
  },
  {
    id: 51,
    title: 'Ayam Rica-Rica',
    category: 'ayam',
    image: 'https://asset.kompas.com/crops/6_Qs_cD9xt9sCiCrqZXVr0zPh8U=/0x276:667x721/1200x800/data/photo/2022/04/17/625b7bdcaf58a.jpeg',
    ingredients: [
      'Ayam potong',
      'Daun kemangi',
      'Cabai merah',
      'Cabai rawit',
      'Jahe',
      'Kunyit',
      'Serai',
      'Daun jeruk'
    ],
    instructions: [
      'Tumis bumbu halus',
      'Masukkan ayam',
      'Tambahkan air secukupnya',
      'Masak hingga meresap',
      'Tambahkan kemangi'
    ]
  },
  {
    id: 52,
    title: 'Sambal Matah',
    category: 'sambal',
    image: 'https://asset.kompas.com/crops/Jx-NvVfob2qseDfoDT5mD9qofxY=/215x129:814x528/1200x800/data/photo/2022/03/19/62356cce51a37.jpg',
    ingredients: [
      'Bawang merah',
      'Serai',
      'Cabai rawit',
      'Daun jeruk',
      'Terasi bakar',
      'Jeruk limau',
      'Minyak kelapa panas',
      'Garam'
    ],
    instructions: [
      'Iris semua bahan',
      'Campur dalam mangkuk',
      'Bakar terasi dan hancurkan',
      'Siram dengan minyak panas',
      'Beri perasan jeruk limau',
      'Aduk rata dan sajikan'
    ]
  },
  {
    id: 53,
    title: 'Pisang Goreng Crispy',
    category: 'jajanan',
    image: 'https://cdn1-production-images-kly.akamaized.net/ySdgBtg3GL8cjauAD7vPHER3APA=/1200x675/smart/filters:quality(75):strip_icc():format(jpeg)/kly-media-production/medias/2489012/original/082341200_1543338546-resep-cara-membuat-pisang-goreng-krispi-renyah-legit-menggigit.jpg',
    ingredients: [
      'Pisang kepok',
      'Tepung terigu',
      'Tepung beras',
      'Tepung maizena',
      'Gula pasir',
      'Vanili',
      'Air soda',
      'Minyak goreng'
    ],
    instructions: [
      'Campur semua tepung dan bumbu',
      'Tambahkan air soda',
      'Celupkan pisang',
      'Goreng hingga keemasan',
      'Taburi dengan gula halus'
    ]
  },
  {
    id: 54,
    title: 'Sate Lilit Ikan',
    category: 'sate',
    image: 'https://asset.kompas.com/crops/BQw7FZnouAUGu6v73DQZKlXb878=/0x16:1000x683/1200x800/data/photo/2021/03/09/6046d1c9bb796.jpg',
    ingredients: [
      '500g ikan tenggiri giling',
      '50g kelapa parut',
      '3 siung bawang putih',
      '5 siung bawang merah',
      '2 cm kunyit',
      '2 cm jahe',
      '2 cm lengkuas',
      '2 batang serai',
      'Garam dan merica secukupnya',
      'Batang serai untuk tusukan'
    ],
    instructions: [
      'Haluskan semua bumbu',
      'Campur ikan giling dengan bumbu halus dan kelapa parut',
      'Uleni hingga tercampur rata',
      'Ambil sedikit adonan, lilitkan pada batang serai',
      'Panggang hingga matang dan kecokelatan'
    ]
  },
  {
    id: 55,
    title: 'Sambal Goreng Ati',
    category: 'sambal',
    image: 'https://img-global.cpcdn.com/recipes/d8e2fb8da0d13979/1200x630cq70/photo.jpg',
    ingredients: [
      '500g hati sapi, potong dadu',
      '3 buah kentang, potong dadu',
      '10 siung bawang merah',
      '5 siung bawang putih',
      '15 cabai merah',
      '5 cabai rawit',
      '3 lembar daun salam',
      '2 lembar daun jeruk',
      'Santan kental',
      'Garam dan gula'
    ],
    instructions: [
      'Goreng kentang hingga kecokelatan',
      'Rebus hati sapi hingga empuk',
      'Tumis bumbu halus hingga harum',
      'Masukkan hati dan kentang',
      'Tambahkan santan dan masak hingga meresap'
    ]
  },
  {
    id: 56,
    title: 'Nasi Bakar Ayam Kemangi',
    category: 'nasi',
    image: 'https://cdn.idntimes.com/content-images/community/2023/06/img-20230601-093407-5e7f09505567688e0cb6154ede497009-146c0b4fea944d4dd4915f3db505ee50_600x400.jpg',
    ingredients: [
      'Nasi putih',
      '250g ayam suwir',
      '2 ikat kemangi',
      'Bumbu halus lengkap',
      'Daun pisang',
      'Daun salam',
      'Serai',
      'Cabai rawit'
    ],
    instructions: [
      'Tumis bumbu halus hingga harum',
      'Masukkan ayam suwir',
      'Tambahkan kemangi',
      'Bungkus nasi dan isian dengan daun pisang',
      'Bakar hingga harum'
    ]
  },
  {
    id: 57,
    title: 'Ikan Asam Pedas',
    category: 'ikan',
    image: 'https://awsimages.detik.net.id/community/media/visual/2022/08/07/resep-ikan-kuah-asam-pedas_43.jpeg?w=1200',
    ingredients: [
      '500g ikan kakap/kerapu',
      'Asam jawa',
      'Cabai merah',
      'Cabai rawit',
      'Serai',
      'Daun jeruk',
      'Tomat',
      'Bumbu halus lengkap'
    ],
    instructions: [
      'Bersihkan ikan dan potong sesuai selera',
      'Tumis bumbu halus hingga harum',
      'Masukkan air dan asam jawa',
      'Masukkan ikan',
      'Masak hingga kuah mengental'
    ]
  },
  {
    id: 58,
    title: 'Sayur Lodeh Nangka Muda',
    category: 'sayur',
    image: 'https://www.masakapahariini.com/wp-content/uploads/2024/06/Resep-Lodeh-Nangka.jpg',
    ingredients: [
      'Nangka muda, potong-potong',
      'Kacang panjang',
      'Terong',
      'Santan',
      'Daun salam',
      'Lengkuas',
      'Bumbu halus',
      'Cabai hijau'
    ],
    instructions: [
      'Rebus nangka muda hingga empuk',
      'Tumis bumbu halus',
      'Masukkan santan',
      'Tambahkan sayuran',
      'Masak hingga matang'
    ]
  },
  {
    id: 59,
    title: 'Telur Balado',
    category: 'jajanan',
    image: 'https://kurio-img.kurioapps.com/21/03/03/e8954a8a-c63d-4a80-a1ad-154473c6f4c4.jpe',
    ingredients: [
      '6 butir telur',
      '15 cabai merah',
      '5 cabai rawit',
      '8 siung bawang merah',
      '4 siung bawang putih',
      'Tomat',
      'Daun jeruk',
      'Garam dan gula'
    ],
    instructions: [
      'Rebus telur hingga matang',
      'Goreng telur hingga kecokelatan',
      'Tumis bumbu halus',
      'Masukkan telur',
      'Masak hingga bumbu meresap'
    ]
  },
  {
    id: 60,
    title: 'Tempe Mendoan',
    category: 'jajanan',
    image: 'https://asset.kompas.com/crops/eGl0yREJLuloJTp9LCNtiSZV6dk=/4x2:972x648/1200x800/data/photo/2022/09/21/632aa5001639f.jpg',
    ingredients: [
      'Tempe, iris tipis',
      'Tepung terigu',
      'Daun bawang',
      'Ketumbar',
      'Bawang putih',
      'Garam',
      'Air',
      'Minyak goreng'
    ],
    instructions: [
      'Haluskan bumbu',
      'Campur tepung dengan bumbu',
      'Tambahkan air secukupnya',
      'Celupkan tempe ke adonan',
      'Goreng setengah matang'
    ]
  }
];

// Komponen RecipeDetail
const RecipeDetail = ({ recipe, onClose }) => (
  <div className="recipe-detail-page">
    <button className="back-button" onClick={onClose}>
      <span>←</span> Kembali
    </button>
    
    <div className="recipe-detail-hero">
      <div className="recipe-detail-image">
        <img src={recipe.image} alt={recipe.title} />
      </div>
    </div>
    
    <div className="recipe-detail-content">
      <h1>{recipe.title}</h1>
      
      <div className="recipe-section">
        <h3>Bahan-bahan</h3>
        <ul>
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      </div>
      
      <div className="recipe-section">
        <h3>Cara Membuat</h3>
        <ol>
          {recipe.instructions.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </div>
    </div>
  </div>
);

// Pindahkan SearchBar ke luar komponen App
const SearchBar = ({ value, onChange }) => (
  <div className="search-container">
    <input
      type="text"
      placeholder="Cari resep..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="search-input"
    />
  </div>
);

const Footer = () => (
  <footer className="footer">
    <div className="footer-content">
      <div className="footer-section">
        <h4>Tentang</h4>
        <ul>
          <li><a href="/about">Tentang Cookid</a></li>
          <li><a href="/blog">Blog</a></li>
          <li><a href="/contact">Hubungi Kami</a></li>
          <li><a href="/partnership">Partnership</a></li>
        </ul>
      </div>

      <div className="footer-section">
        <h4>Resep</h4>
        <ul>
          <li><a href="/recipes/new">Resep Terbaru</a></li>
          <li><a href="/recipes/popular">Resep Populer</a></li>
          <li><a href="/recipes/video">Video Resep</a></li>
          <li><a href="/recipes/collections">Koleksi Resep</a></li>
        </ul>
      </div>

      <div className="footer-section">
        <h4>Bantuan</h4>
        <ul>
          <li><a href="/help">Pusat Bantuan</a></li>
          <li><a href="/privacy">Kebijakan Privasi</a></li>
          <li><a href="/terms">Syarat & Ketentuan</a></li>
          <li><a href="/faq">FAQ</a></li>
        </ul>
      </div>

      <div className="footer-section">
        <h4>Ikuti Kami</h4>
        <div className="social-links">
          <a href="https://instagram.com/Cookid" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="https://facebook.com/Cookid" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook"></i>
          </a>
          <a href="https://youtube.com/Cookid" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-youtube"></i>
          </a>
          <a href="https://tiktok.com/@Cookid" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-tiktok"></i>
          </a>
        </div>
      </div>
    </div>

    <div className="footer-bottom">
      <div className="footer-bottom-content">
        <p>© 2024 Cookid. All rights reserved.</p>
        <div className="app-download">
          <a href="#" className="app-button">
            <i className="fab fa-app-store-ios"></i>
            <span>Download on App Store</span>
          </a>
          <a href="#" className="app-button">
            <i className="fab fa-google-play"></i>
            <span>Get it on Google Play</span>
          </a>
        </div>
      </div>
    </div>
  </footer>
);

const App = () => {
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [isDetailPage, setIsDetailPage] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Fungsi untuk filter resep
  const getFilteredRecipes = () => {
    let filtered = recipes;
    
    if (searchQuery) {
      filtered = filtered.filter(recipe =>
        recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (selectedCategory) {
      filtered = filtered.filter(recipe =>
        recipe.category === selectedCategory
      );
    }
    
    return filtered;
  };

  // Komponen CategoryCard
  const CategoryCard = ({ category }) => (
    <div 
      className={`category-card ${selectedCategory === category.id ? 'active' : ''}`} 
      onClick={() => {
        setSelectedCategory(selectedCategory === category.id ? null : category.id);
      }}
    >
      <h3>{category.title}</h3>
    </div>
  );

  // Komponen RecipeCard
  const RecipeCard = ({ recipe }) => (
    <div className="recipe-card" onClick={() => {
      setSelectedRecipe(recipe);
      setIsDetailPage(true);
      window.scrollTo(0, 0);
    }}>
      <div className="recipe-image">
        <img src={recipe.image} alt={recipe.title} />
      </div>
      <div className="recipe-content">
        <h3>{recipe.title}</h3>
      </div>
    </div>
  );

  return (
    <div className="app">
      {!isDetailPage ? (
        <>
          <header className="header">
            <div 
              className="logo" 
              onClick={() => {
                setIsDetailPage(false);
                setSelectedRecipe(null);
                setSelectedCategory(null);
                setSearchQuery('');
              }}
            >
              <h1>Cookid</h1>
              <p>Resep Masakan Indonesia</p>
            </div>
            <SearchBar 
              value={searchQuery}
              onChange={setSearchQuery}
            />
          </header>

          <section className="categories">
            <div className="categories-grid">
              {categories.map(category => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          </section>

          <section className="recipes">
            <div className="recipes-grid">
              {getFilteredRecipes().map(recipe => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          </section>

          <Footer />
        </>
      ) : (
        <RecipeDetail 
          recipe={selectedRecipe} 
          onClose={() => {
            setIsDetailPage(false);
            setSelectedRecipe(null);
          }} 
        />
      )}
    </div>
  );
};

export default App;
