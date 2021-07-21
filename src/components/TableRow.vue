<template>
    <div>
        <div class="flex-row row">
            <div class="flex-cell col-6" :style=padding>
                <b-icon-chevron-down v-if="hasChildren"></b-icon-chevron-down>
                {{ row.name }}</div>
            <div class="flex-cell col-6">{{ row.phone }}</div>
        </div>
        <TableRow v-for="item in row.children" :row="item" v-bind:key="item.unique" :depth="newDepth"/>
    </div>
</template>

<script>
    import { BIcon, BIconChevronDown } from 'bootstrap-vue'
    export default {
        name: "TableRow",
        props: ['row', 'depth'],
        components: {
            BIcon,
            BIconChevronDown
        },
        data() {
            return {
                newDepth: this.depth + 1,
                padding: 'padding-left: ' + (this.depth * 20 + 15) + 'px',
                hasChildren: Object.keys(this.row.children).length > 0
            }
        }
    }
</script>

<style scoped>

</style>