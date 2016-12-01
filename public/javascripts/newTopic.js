'use strict';

document.addEventListener('DOMContentLoaded', function () {
    Forum.init();
});

var Forum = function () {

    function init() {

        var newEntryForm = document.getElementById('new-entry');
        newEntryForm.addEventListener('submit', newEntryHandler);

        var entryName = document.querySelector('input');
        entryName.addEventListener('keyup', constrainText.bind(null, 45));

        var entryTopic = document.getElementById('new-entry-topic');
        entryTopic.addEventListener('keyup', constrainText.bind(null, 45));

        var entryText = document.getElementById('new-entry-text');
        entryText.addEventListener('keyup', constrainText.bind(null, 1000));

        var textArea = document.querySelector('textarea');
        textArea.addEventListener('keyup', counter);
    }

    function newEntryHandler(e) {
        var name = e.target.elements["name"];
        var nameValue = name.value;
        var text = e.target.elements["data"];
        var textValue = text.value;
        var topic = e.target.elements["topic_name"];
        var topicValue = topic.value;

        if (nameValue === '' || textValue === '' || topicValue === '') {
            e.preventDefault();
            alert('Fylla þarf í nafn, efni og texta');
            return;
        }
    }

    function counter() {
        var charCount = document.querySelector('.char-count');
        var textArea = document.querySelector('textarea');
        var letters = textArea.value;
        charCount.textContent = letters.length;
    }

    function constrainText(maxChars, e) {
        var input = e.target.value;
        if (input.length > maxChars) {
            alert('Stafafjöldi er yfir hámarki. Hámarksfjöldi er 45 stafir.');
            input = input.substring(0, maxChars);
            e.target.value = input;
        }
    }
    return {
        init: init
    };
}();