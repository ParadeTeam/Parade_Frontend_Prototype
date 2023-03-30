<script setup lang="ts">
    import { openNoteModal, handleHighlight, addNewNote } from '../assets/js/highlight';

    const props = defineProps({
        slide_id: {type: Number, default: 0}
    });

    const data = {
        "color_picker_items": [
            {
                "color": "mark"
            },
            {
                "color": "#fb9191"
            },
            {
                "color": "#7ab3ff"
            },
            {
                "color": "#6bc16f"
            },
        ]
    };

    const remark_color = "#f1cc89";
</script>

<template>
    <div id="tool-modal" class="custom-modal d-none">
        <div class="modal-body">
            <input type="hidden" name="position_x">
            <input type="hidden" name="position_y">
            <div class="color-pickers">
                <span v-for="(item) in data.color_picker_items" class="color-picker-item" :style="{'background-color': item.color}" v-on:click="handleHighlight(item.color, props.slide_id);">
                </span>
            </div>
            <div class="note-btn-groups">
                <button type="button" class="btn">
                    <i class="fa-solid fa-hashtag"></i>
                </button>
                <button type="button" class="btn" v-on:click="openNoteModal();">
                    <i class="fa-solid fa-pen"></i>
                </button>
            </div>
        </div>
    </div>

    <div id="note-modal" class="custom-modal d-none">
        <textarea name="note" rows="3"></textarea>
        <button type="button" class="btn" v-on:click="addNewNote(remark_color, props.slide_id);">Noted</button>
    </div>
</template>