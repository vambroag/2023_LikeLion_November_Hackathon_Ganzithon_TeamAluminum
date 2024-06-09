const answer_shade = document.querySelector("#answer_shade");
const correct_answer_box = document.querySelector("#correct_answer_box");
const wrong_answer_box = document.querySelector("#wrong_answer_box");
let currentDroppable = null;

item.onmousedown = function (event) {

    let shiftX = event.clientX - item.getBoundingClientRect().left;
    let shiftY = event.clientY - item.getBoundingClientRect().top;

    item.style.position = 'absolute';
    item.style.zIndex = 1000;
    document.querySelector("#container").append(item);

    moveAt(event.clientX, event.clientY);

    console.log(event.clientX);

    function moveAt(clientX, clientY) {
        item.style.left = (clientX - shiftX - 155) + 'px';
        item.style.top = (clientY - shiftY - 15) + 'px';
    }

    function onMouseMove(event) {
        moveAt(event.clientX, event.clientY);

        item.hidden = true;
        let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
        item.hidden = false;

        if (!elemBelow) return;

        let droppableBelow = elemBelow.closest('.recycle_image');
        if (currentDroppable != droppableBelow) {
            if (currentDroppable) { // null when we were not over a droppable before this event
                leaveDroppable(currentDroppable);
            }
            currentDroppable = droppableBelow;
            if (currentDroppable) { // null if we're not coming over a droppable now
                // (maybe just left the droppable)
                enterDroppable(currentDroppable);
            }
        }
    }

    document.addEventListener('mousemove', onMouseMove);

    item.onmouseup = function () {
        document.removeEventListener('mousemove', onMouseMove);
        if (currentDroppable.id == "canbottle_img") {
            answer_shade.style.height = "100%";
            answer_shade.style.display = "flex";
            correct_answer_box.style.height = "451.66px";
            correct_answer_box.style.display = "flex";
        } else {
            answer_shade.style.height = "100%";
            answer_shade.style.display = "flex";
            wrong_answer_box.style.height = "451.66px";
            wrong_answer_box.style.display = "flex";
        }
        item.onmouseup = null;
    };

};

function enterDroppable(elem) {
    elem.style.background = '';
}

function leaveDroppable(elem) {
    elem.style.background = '';
}

item.ondragstart = function () {
    return false;
};