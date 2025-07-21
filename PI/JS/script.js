// Carrousel

var displacementValue;
var offsideColumns;


function updateDisplacementValue(){
    if (window.matchMedia("(max-width: 800px)").matches) {
      console.log("-800");
      displacementValue = 100;
      offsideColumns=6;

    } else if (window.matchMedia("(max-width: 1199px)").matches){
      console.log("949 - < 1199");
      displacementValue = 34;
      offsideColumns=4;
    }

    else {
      console.log("+996");
      displacementValue = 20.55;
      offsideColumns=2;

    }

}



var counterSlides=0;

function palante(){

    updateDisplacementValue();

    counterSlides= counterSlides-displacementValue;

    if(counterSlides<-displacementValue*offsideColumns){
        counterSlides=0;
    }

var contSlidercards = document.getElementById("cardContainer");

contSlidercards.style.marginLeft=counterSlides+"%";

}


function patras(){

    updateDisplacementValue();

    counterSlides= counterSlides+displacementValue;

    if(counterSlides>0){
        counterSlides=-displacementValue*offsideColumns;
    }
var contSlidercards = document.getElementById("cardContainer");
contSlidercards.style.marginLeft=counterSlides+"%";
}


//https://youtu.be/5G3usm0LXWw

function toggleicon(modalId) {
    const modaluser = document.getElementById(modalId);
    modaluser.classList.toggle("show");
}

// Cierra el modal si se hace clic fuera de él
window.onclick = (event) => {
    // Cierra todos los modales si se hace clic fuera de cualquiera
    document.querySelectorAll('.modaluser').forEach(modal => {
        if (!event.target.matches('.icontoggle') && !event.target.closest('.modaluser')) {
            if (modal.classList.contains("show")) {
                modal.classList.remove("show");
            }
        }
    });
    document.querySelectorAll('.Modalplayer').forEach(modal => {
        if (!event.target.matches('.toggleplayers') && !event.target.closest('.Modalplayer')) {
            if (modal.classList.contains("show")) {
                modal.classList.remove("show");
            }
        }
    });

     document.querySelectorAll('.modalconfig').forEach(modal => {
        if (!event.target.matches('.toggleconfig') && !event.target.closest('.modalconfig')) {
            if (modal.classList.contains("show")) {
                modal.classList.remove("show");
            }
        }
    });

};



document.querySelectorAll('.modaluser').forEach(modal => {
    modal.addEventListener('click', event => event.stopPropagation());
});

// Modalplayer

function toggleplayers(modalId) {
    const Modalplayer = document.getElementById(modalId);
    Modalplayer.classList.toggle("show");
}

function hidemodalplayer(modalId) {
    const Modalplayer = document.getElementById(modalId);
    Modalplayer.classList.toggle("show");
}

document.querySelectorAll('.Modalplayer').forEach(modal => {
    modal.addEventListener('click', event => event.stopPropagation());
});

// Modalconfig

function toggleconfig(modalId) {
    const modalconfig = document.getElementById(modalId);
    modalconfig.classList.toggle("show");
}

// Modalcreate

function togglecreator() {
    var modalcreator = document.getElementById("modalcreator");
    modalcreator.classList.toggle("show");
}

// Modalsearch

function togglesearch(modalId) {
    const modalsearch = document.getElementById(modalId);
    modalsearch.classList.toggle("show");
}

// Editor de texto titulo modalconfig

// Función para iniciar la edición del título
function startEditing(modalId) {
    var modal = document.getElementById(modalId);
    if (!modal) return; // Verifica si el modal existe
    
    var titleElement = modal.querySelector('.editable-title');
    var titleInput = modal.querySelector('.title-editor');
    
    if (titleElement && titleInput) {
        titleInput.value = titleElement.innerText;
        titleElement.style.display = 'none';
        titleInput.style.display = 'block';
        titleInput.focus();
    }
}

// Función para guardar el título
function saveTitle(modalId) {
    var modal = document.getElementById(modalId);
    if (!modal) return; // Verifica si el modal existe

    var titleElement = modal.querySelector('.editable-title');
    var titleInput = modal.querySelector('.title-editor');
    
    if (titleElement && titleInput) {
        titleElement.innerText = titleInput.value;
        titleElement.style.display = 'block';
        titleInput.style.display = 'none';
    }
}

// Función para manejar el evento Enter
function checkEnter(event, modalId) {
    if (event.key === 'Enter') {
        saveTitle(modalId);
    }
}

// Inicializa la carga de imágenes
function initializeImageUpload(modalId) {
    var modal = document.getElementById(modalId);
    if (!modal) return;
    
    var fileInput = modal.querySelector('input[type="file"]');
    var rectangle = modal.querySelector('.rectangle');
    
    if (fileInput && rectangle) {
        fileInput.addEventListener('change', function(event) {
            var file = event.target.files[0];
            if (file) {
                var reader = new FileReader();
                reader.onload = function(e) {
                    rectangle.style.backgroundImage = `url(${e.target.result})`;
                    rectangle.style.backgroundSize = 'cover';
                    rectangle.style.backgroundPosition = 'center';
                };
                reader.readAsDataURL(file);
            }
        });
    }
}

// Maneja la carga inicial de los modales y sus eventos
document.addEventListener('DOMContentLoaded', function() {
    // Inicializa los modales con IDs específicos
    initializeImageUpload('modalconfig1');
    initializeImageUpload('modalconfig2');
    initializeImageUpload('modalconfig3');
    initializeImageUpload('modalcreator');

    // Añade eventos para editar títulos en los modales
    document.querySelectorAll('.edit-button').forEach(button => {
        button.addEventListener('click', function() {
            const modalId = this.closest('.modalconfig').id;
            startEditing(modalId);
        });
    });

    // Añade eventos para guardar el título al presionar Enter
    document.querySelectorAll('.title-editor').forEach(input => {
        input.addEventListener('keydown', function(event) {
            const modalId = this.closest('.modalconfig').id;
            checkEnter(event, modalId);
        });
    });

    // Añade eventos para guardar el título al perder el foco (blur)
    document.querySelectorAll('.title-editor').forEach(input => {
        input.addEventListener('blur', function() {
            const modalId = this.closest('.modalconfig').id;
            saveTitle(modalId);
        });
    });
});
