<template>
    <div class="container mt-5">
        <div>
            <b-button v-b-modal.modal-center variant="primary">Добавить</b-button>

            <b-modal id="modal-center" centered title="Добавление пользователя"
                     ok-only @ok="handleOk">
                <div class="container">
                    <form>
                        <div class="form-group row mb-3">
                            <div class="col-4"><label for="inputName"><span class="red">*</span>&nbsp;Имя</label></div>
                            <div class="col-8"><input type="text" class="form-control" id="inputName" v-model="name"></div>
                        </div>
                        <div class="form-group row mb-3">
                            <div class="col-4"><label for="phoneNumber"><span class="red">*</span>&nbsp;Телефон</label></div>
                            <div class="col-8"><input type="text" class="form-control" id="phoneNumber" v-model="phone"></div>
                        </div>
                        <div class="form-group row mb-3">
                            <div class="col-4"><label for="chief">Начальник</label></div>
                            <div class="col-8"><select class="form-control" id="chief" v-model="chief">
                                <option v-for="user in users" :value="user.id">
                                    {{ user.name }}
                                </option>
                            </select></div>
                        </div>
                    </form>
                </div>
                <template #modal-footer="{ ok, cancel, hide }">
                    <div class="container"><div class="row">
                        <div class="col-4"></div>
                        <div class="col-8"><b-button @click="ok()" variant="primary">
                            Сохранить
                        </b-button></div>
                    </div></div>
                </template>
            </b-modal>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapMutations} from "vuex";
    export default {
        name: "AddItem",
        data() {
            return {
                name: '',
                phone: '',
                chief: 0
            }
        },
        computed: mapGetters(["users"]),
        methods: {
            ... mapMutations(["addUser"]),
            handleOk() {
                if (this.name !== '' && this.phone !== '') {
                    this.addUser({
                        user: {
                            name: this.name,
                            phone: this.phone,
                            id: Date.now(),
                            unique: "id" + Math.random().toString(16).slice(2),
                            nextNodes: {}
                        },
                        chief: this.chief}
                    );

                    // clear the form
                    this.name = '';
                    this.phone = '';
                    this.chief = 0;
                }
                else {
                    alert("Error: required fields empty")
                }
            }
        }
    }
</script>

<style>
    button.close {
        border: none;
        background-color: transparent;
        font-size: 30px;
    }
    .red {color: red}
</style>