String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};

new Vue({
    el: '#app',
    data: {
        calculation: '',
        tempResult: '',
    },
    mounted() {
        let btns = document.querySelectorAll('.btn')
        for (btn of btns) {
            btn.addEventListener('click', function() {
                this.classList.add('animate')
                this.classList.add('resetappearanim')
            })
            btn.addEventListener('animationend', function() {
                this.classList.remove('animate')
            })
        }
    },
    methods: {
        append(value) {
            this.calculation += value.toString()
        },
        clear() {
            this.calculation = ''
            this.tempResult = ''
        },
    },
})