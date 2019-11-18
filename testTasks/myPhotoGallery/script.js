window.onload = () => {

const listNameAlbums = [];

const сreateNewOptionDell = (name) => {
	const newOption = document.createElement('option');
	newOption.value = name;
	newOption.textContent = name;
	document.querySelector('#select-form-dell-album').appendChild(newOption);
};

const сreateNewOptionEdit = (name) => {
	const newOption = document.createElement('option');
	newOption.value = name;
	newOption.textContent = name;
	document.querySelector('#select-form-edit-album').appendChild(newOption);
};


document.querySelectorAll('.album-name').forEach(el => {
	listNameAlbums.push(el['textContent']);
	сreateNewOptionDell(el['textContent']);
	сreateNewOptionEdit(el['textContent']);
});


const checked = ({target}) => {
	target.parentElement.classList.toggle('checked');
	target.parentElement.classList.toggle('photo');
};

const addphotoToDelphotoForm = () => {
	const containerDellphoto = document.querySelector('.container-dell-photo');
	document.querySelector('.center').querySelectorAll('img').forEach(el => {
		const srcphoto = el.src;
		const newDiv = document.createElement('div');
		newDiv.classList.add('photo');
		newDiv.addEventListener('click', checked);
		newDiv.innerHTML = `<img src=${srcphoto} alt="">`;
		containerDellphoto.appendChild(newDiv);
	});
};

const dellphoto = () => {
	const arrphotoSrcChecked = [];
	document.querySelector('.center').classList.toggle('hidden');
	document.querySelectorAll('.checked img').forEach(el => {
	arrphotoSrcChecked.push(el.src);
	});

	const nameAlbumChecked = document.querySelector('.heading').textContent;


	document.querySelectorAll('.album-name').forEach(el => {
		if (el.textContent === nameAlbumChecked) {
			el.parentElement.querySelectorAll('img').forEach(el => {
				if (arrphotoSrcChecked.includes(el.src)) {
					el.remove();
				}
			});
		}
	});

	const containerphotoCentr = document.querySelector('.container-dell-photo');
	containerphotoCentr.querySelectorAll('img').forEach(el => {
		if (arrphotoSrcChecked.includes(el.src)) {
			const srcDellphoto = el.src;
			document.querySelectorAll('.gallery-item').forEach(el => {
				if (el.querySelector('img').src === srcDellphoto) {
					el.remove();
				}
			});
		}
	});

	clearFormDellphoto();
};

const clearFormDellphoto = () => {
	document.querySelector('#del-photo-form').classList.toggle('open-close');
	document.querySelector('.center').classList.toggle('hidden');
	const containerDellphoto = document.querySelector('.container-dell-photo');
	containerDellphoto.innerHTML = '';
};



	const clearFormAddphoto = () => {
		document.querySelector('#add-photo-input-name').value = '';
	};

	const addphoto = () => {
		const nameAlbum = document.querySelector('.heading');
		const url = document.querySelector('#add-photo-input-name').value;

		if (document.querySelector('#firstDescription')) {
			nameAlbum.textContent = 'Выберите нужный альбом';
			nameAlbum.style.color = 'red';
			return;
		} else if (!url) {
			nameAlbum.textContent = 'Выберите нужную фотографию';
			nameAlbum.style.color = 'red';
			return;
		}

		const nameAlbumChecked = nameAlbum.textContent;

		document.querySelectorAll('.album-name').forEach(el => {
			if (el.textContent === nameAlbumChecked) {
				const newImg = document.createElement('img');
				newImg.src = url;
				newImg.alt = "";
				el.parentElement.appendChild(newImg);

				const newDiv = document.createElement('div');
				newDiv.classList.add('gallery-item');
				newDiv.innerHTML = `<img class="gallery-image" src="${url}" alt="">`;
				newDiv.addEventListener('click', showBigImage);
				document.querySelector('.gallery').append(newDiv);
			}
		});
		clearFormAddphoto();
	};



	const deleteOptionDell = (name) => {
		const selected = document.querySelector('#select-form-dell-album').querySelectorAll('option');

		selected.forEach(el => {
			if (el.value === name) {
				document.querySelector('#select-form-dell-album').removeChild(el);
			}
		});
	};


	const deleteOptionEdit = (name) => {
    document.querySelector('#select-form-edit-album').querySelectorAll('option').forEach(el => {
			if (el.value === name) {
				document.querySelector('#select-form-edit-album').removeChild(el);
			}
		});
	};


	const deleteInlistNameAlbums = (name) => {
		const pos = listNameAlbums.indexOf(name);
		listNameAlbums.splice(pos, 1);
	};


	const deleteAlbum = () => {
		let nameCheckOption;
		document.querySelector('#select-form-dell-album').querySelectorAll('option').forEach(el => {
			if (el.selected) {
				nameCheckOption = el.value;
			}
		});

		document.querySelectorAll('.catalog-left').forEach(el => {
			const pText = el.firstElementChild.textContent;
			if (pText === nameCheckOption) {
				document.querySelector('.left').removeChild(el);
				deleteOptionDell(pText);
				deleteInlistNameAlbums(pText);
				deleteOptionEdit(pText);
			}
		});

		if (document.querySelector('.heading').textContent === nameCheckOption) {
			document.querySelector('.albumName').innerHTML = '<p class="heading" id="firstDescription">Тестовое задание - фотогалерея </p>';
			document.querySelector('.gallery').innerHTML = '';
		}
	};


const addAlbum = () => {
	const сreateNewAlbum = (name, description = null) => {
		const newDiv = document.createElement('div');
		newDiv.classList.add('catalog-left');
		const newP = document.createElement('p');
		newP.classList.add('album-name');
		newP.textContent = name;
		const newPdescription = document.createElement('p');
		newPdescription.classList.add('description');

		if (description) {
			newPdescription.textContent = description;
		}

		newDiv.appendChild(newP);
		newDiv.appendChild(newPdescription);
		newDiv.addEventListener('click', DisplayingListOfPhotos);
		return newDiv;
	};

		const input = document.querySelector('#add-catalog-input-name');
		const textarea = document.querySelector('#add-catalog-textarea-description');
		const name = input.value;
		const description = textarea.value;

		if (name && !listNameAlbums.includes(name)) {
			const newAlbum = сreateNewAlbum(name, description);
			document.querySelector('.left').appendChild(newAlbum);
			сreateNewOptionDell(name);
			сreateNewOptionEdit(name);

			listNameAlbums.push(name);
			input.value = '';
			textarea.value = '';
		} else {
			document.querySelector('.heading').textContent = '"Этот альбом не существует';
			document.querySelector('.heading').style.color = 'red';
			return;
		}

};


const showBigImage = ({target}) => {
	const show = document.querySelector('.show');
	const src = target.src;
	const imgShow = document.querySelector('.img-show');
	const img = imgShow.querySelector('img');
	const span = imgShow.querySelector('span');

	img.src = src;
	show.style.display = 'block';

	span.addEventListener('click', (() => show.style.display = 'none'));
};

const DisplayingListOfPhotos = ({target}) => {
	const $gallery = document.querySelector('.gallery');
	const $catalogName = document.querySelector('.albumName');
	const $description = document.querySelector('.catalog-description');
	$gallery.innerHTML = '';

	const $hisBlock = target.closest('.catalog-left');
	const textNameCatalog = $hisBlock.querySelector('p').textContent;
	const textDescription = $hisBlock.querySelector('.description').textContent;

	$catalogName.innerHTML = `<p class="heading">${textNameCatalog}<p>`;
	$description.textContent = textDescription;

	const imgSelectors = $hisBlock.querySelectorAll(['img']);
	imgSelectors.forEach(el => {
		const newDiv = document.createElement('div');
		newDiv.classList.add('gallery-item');
		newDiv.innerHTML = `<img class="gallery-image" src="${el['src']}" alt="">`;
		newDiv.addEventListener('click', showBigImage);
		$gallery.append(newDiv);
  });
};



const clearFormEdit = () => {
	document.querySelector('#edit-catalog-input-name').value = '';
	document.querySelector('#edit-catalog-textarea-description').value = '';
};

const getAlbumDetails = () => {
	let nameCheckOption;

	document.querySelector('#select-form-edit-album').querySelectorAll('option').forEach(el => {
		if (el.selected) {
			nameCheckOption = el.value;
		}
		clearFormEdit();
	});

	document.querySelectorAll('.catalog-left').forEach(el => {
		if (el.firstElementChild.textContent === nameCheckOption) {
			const name = el.querySelector('.album-name').textContent;
			const description = el.querySelector('.description').textContent;
			document.querySelector('#edit-catalog-input-name').value = name;

			if (!description) {
				document.querySelector('#edit-catalog-textarea-description').value = 'нет описания';
			} else {
				document.querySelector('#edit-catalog-textarea-description').value = description;
			}
		}
	});
};

const editAlbum = () => {
	let nameCheckOption;
		document.querySelector('#select-form-edit-album').querySelectorAll('option').forEach(el => {
			if (el.selected) {
				nameCheckOption = el.value;
			}
	});
	document.querySelectorAll('.catalog-left').forEach(el => {
		if (el.firstElementChild.textContent === nameCheckOption) {
			const newName = document.querySelector('#edit-catalog-input-name').value
				? document.querySelector('#edit-catalog-input-name').value
				: 'Альбом без имени';

			const newDescription = document.querySelector('#edit-catalog-textarea-description').value;
			el.firstElementChild.textContent = newName;
			el.querySelector('.description').textContent = newDescription;

			if (newName !== nameCheckOption) {
				deleteInlistNameAlbums(nameCheckOption);
				listNameAlbums.push(newName);
				сreateNewOptionDell(newName);
				сreateNewOptionEdit(newName);
				deleteOptionDell(nameCheckOption);
				deleteOptionEdit(nameCheckOption);
				document.querySelector('.heading').textContent = newName;
			}

			document.querySelector('.catalog-description').textContent = newDescription;

			clearFormEdit();
		}
	});

	document.querySelector('#edit-album-form').classList.toggle('open-close');
};


	document.querySelectorAll('.catalog-left').forEach(el => {
		el.addEventListener('click', DisplayingListOfPhotos);
	});


	document.querySelector('#delete-album').addEventListener('click', (() => {
		document.querySelector('#del-album-form').classList.toggle('open-close');
	}));

	document.querySelector('#button-close').addEventListener('click', (() => {
		document.querySelector('#del-album-form').classList.toggle('open-close');
	}));

	document.querySelector('#button-dell').addEventListener('click', deleteAlbum);
	document.querySelector('#button-dell').addEventListener('click', (() => {
		document.querySelector('#del-album-form').classList.toggle('open-close');
	}))

	document.querySelector('#add-album').addEventListener('click', (() => {
		document.querySelector('#add-album-form').classList.toggle('open-close');
	}));

	document.querySelector('#add-button-close').addEventListener('click', (() => {
		document.querySelector('#add-album-form').classList.toggle('open-close');
	}));

	document.querySelector('#button-add').addEventListener('click', addAlbum);
	document.querySelector('#button-add').addEventListener('click', (() => {
		document.querySelector('#add-album-form').classList.toggle('open-close');
	}));


	document.querySelector('#edit-album').addEventListener('click', (() => {
		document.querySelector('#edit-album-form').classList.toggle('open-close');
	}));

	document.querySelector('#edit-button-close').addEventListener('click', (() => {
		document.querySelector('#edit-album-form').classList.toggle('open-close');
	}));

	document.querySelector('#edit-button-close').addEventListener('click', clearFormEdit);

	document.querySelector('#button-edit-choose').addEventListener('click', getAlbumDetails);

	document.querySelector('#button-edit').addEventListener('click', editAlbum);

	document.querySelector('#add-photo').addEventListener('click', (() => {
		document.querySelector('#add-photo-form').classList.toggle('open-close');
	}));



	document.querySelector('#button-add-photo').addEventListener('click', addphoto);

	document.querySelector('#button-add-photo').addEventListener('click', (() => {
		document.querySelector('#add-photo-form').classList.toggle('open-close');
	}));

	document.querySelector('#button-close-form-photo').addEventListener('click', (() => {
		document.querySelector('#add-photo-form').classList.toggle('open-close');
	}));
	document.querySelector('#button-close-form-photo').addEventListener('click', clearFormAddphoto);

	document.querySelector('#delete-photo').addEventListener('click', (() => {
		if (document.querySelector('#firstDescription')) {
			document.querySelector('.heading').textContent = '<-- выберите альбом';
			document.querySelector('.heading').style.color = 'red';
			return;
		}
		document.querySelector('#del-photo-form').classList.toggle('open-close');
		document.querySelector('.center').classList.toggle('hidden');
		addphotoToDelphotoForm();
		if (!document.querySelector('.center').classList.contains('hidden')) {
			const containerDellphoto = document.querySelector('.container-dell-photo');
	    containerDellphoto.innerHTML = '';
		}
	}));

	document.querySelector('#button-dell-photo').addEventListener('click', dellphoto);
	document.querySelector('#button-dell-photo').addEventListener('click', clearFormDellphoto);

	document.querySelector('#button-dell-photo').addEventListener('click', (() => {
		document.querySelector('#del-photo-form').classList.toggle('open-close');

	}));

	document.querySelector('#button-close-photo').addEventListener('click', clearFormDellphoto);
};
