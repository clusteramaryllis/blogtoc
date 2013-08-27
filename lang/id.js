// BlogToc language configuration
// language : Bahasa Indonesia
// author : Cluster Amarylis

(function(){
	
	var loadLang = function( BlogToc ) {
		(function(){

			/*****************************************************************
			 * You can change these lines                                    *
			 *****************************************************************/
			BlogToc.language( 'id', {
				labelAll: 'Semua',
				newLabel: 'Baru',
				index: '#',
				thumbnail: 'Bingkai',
				title: 'Judul',
				author: 'Pengarang',
				comment: 'Komentar',
				publishDate: 'Diterbitkan',
				updateDate: 'Diperbaharui',
				summary: 'Ringkasan',
				display: ' arsip per halaman',
				search: 'Pencarian :',
				noRecords: 'Arsip yang cocok tidak ditemukan',
				result: 'Menampilkan {begin} s/d {end} dari total {total}',
				firstPage: '&laquo; Pertama',
				lastPage: 'Terakhir &raquo;',
				prevPage: '&lsaquo; Sebelum',
				nextPage: 'Sesudah &rsaquo;',
				errorMessage: 'Pesan error ini adalah bagian dari aplikasi BlogToc & terjadi karena salah satu sebab, diantaranya :' + 
				  '\n' +
				  '\n • URL yang Anda sediakan tidak valid.' +
				  '\n • URL yang Anda sediakan bukan termasuk blogspot.' +
				  '\n • Blog termasuk dalam blog privat.' +
				  '\n • Blog telah dihapus.' +
				  '\n • Ada gangguan pada koneksi internet Anda.'
			});
			/*****************************************************************
			 * End changing lines                                            *
			 *****************************************************************/

		})();
	}

	if ( typeof window !== 'undefined' && window.BlogToc ) {
		loadLang( window.BlogToc );
	}

})();