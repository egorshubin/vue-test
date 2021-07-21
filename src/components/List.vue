<template>
    <div class="container">
        <h1 class="mt-4 mb-4">Список сотрудников</h1>
        <div class="mb-5">
            <div class="container">
                <div class="flex-head">
                <div class="flex-row row">
                    <div class="flex-cell col-6">Имя</div>
                    <div class="flex-cell col-6">Телефон</div>
                </div>
                </div>

                <TableRow v-for="item in tree" v-bind:key="item.unique" :row="item" :depth="0"/>

            </div>
        </div>
        <AddItem/>
    </div>
</template>

<script>
    import AddItem from './AddItem.vue';
    import TableRow from './TableRow.vue';
    import { mapGetters} from "vuex";
    export default {
        name: "List",
        components: {
            AddItem,
            TableRow
        },
        methods: {
            generateItem(key, users, rootVisited, multiList) {
                // we won't have to process this key in original cycle again
                delete users[key];
                // but the original array is preserved
                let user = this.users[key];

                let children = {};
                if (Object.keys(user.nextNodes).length > 0) {
                    for (let key1 in user.nextNodes) {
                        if (rootVisited.hasOwnProperty("key1")) {
                            // this child node is already created list, we delete it from the formed tree and
                            // add as it is, saving time
                            children[key1] = multiList[key1];
                            delete multiList[key1];
                        } else {
                            children[key1] = this.generateItem(key1, users, rootVisited, multiList)
                        }
                    }
                }

                return {
                    ... user,
                    children: children
                };
            }
        },
        computed: {
            ... mapGetters(["users"]),
            tree() {
                let multiList = {};
                // we will delete from this array processed users
                let users = {
                    ... this.users
                }
                let rootVisited = {};

                for (let key in users) {
                    // we will need rootVisited variable if we stumble upon a situation when next node has current
                    // node as parent, then we will add the created array at once
                    rootVisited[key] = 1;
                    multiList[key] = this.generateItem(key, users, rootVisited, multiList)
                }
                console.log(multiList)
                return multiList;
            }
        }
    }
</script>

<style lang="scss">
    .flex-head {
        .flex-cell {
            font-weight: bold;
        }
    }
    .flex-row {
        border-bottom: 1px solid #ddd;
        .flex-cell {
            padding: 15px;
        }
    }
</style>