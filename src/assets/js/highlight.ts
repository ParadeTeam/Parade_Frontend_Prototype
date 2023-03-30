import { NoteAPI } from "../../utils/http/API";

const NODE_TYPE_NORMAL = 1;
const NODE_TYPE_TEXT = 2;

interface NoteModel {
    note_type: number;
    note_text: string;
    color: string;
    position_x: number,
    position_y: number,
    remark: string;
    slide_id: number;
    range: {
      anchor_node_parent_identifier: string;
      anchor_node_parent_index: number;
      anchor_node_identifier: string;
      anchor_node_type: number;
      anchor_node_index: number;
      anchor_node_offset: number;
      focus_node_parent_identifier: string;
      focus_node_parent_index: number;
      focus_node_identifier: string;
      focus_node_type: number;
      focus_node_index: number;
      focus_node_offset: number;
    }
  }

var iframe: any, iframe_doc: { addEventListener: (arg0: string, arg1: () => void, arg2: boolean) => void; attachEvent: (arg0: string, arg1: () => void) => void; all: any; selection: { createRange: () => { (): any; new(): any; text: any; }; }; getSelection: () => any; };

const loadFrame = () => {
    iframe = document.getElementById("myFrame");
    iframe_doc = (iframe as any).contentDocument || (iframe as any).contentWindow.document;

    if (typeof iframe_doc.addEventListener != "undefined") {
        iframe_doc.addEventListener("mouseup", function() {
            let e = window.event;
            openHighlightPanel(e);
        }, false);
    } else if (typeof iframe_doc.attachEvent != "undefined") {
        iframe_doc.attachEvent("onmouseup", openHighlightPanel);
    }
}

function openHighlightPanel(e?: any) {
    console.log(e);
    let t = (iframe_doc.all) ? iframe_doc.selection.createRange().text : iframe_doc.getSelection();
    let position_x = 0,
        position_y = e.offsetY;
    
    if (!position_x) {
        position_x = 0;
    }

    if (!position_y) {
        position_y = 0;
    }

    if (!t.toString()) {
        $('.custom-modal').addClass('d-none');
        return;
    }

    $('#tool-modal input[name="position_x"]').val(position_x);
    $('#tool-modal input[name="position_x"]').val(position_y);
    $('#tool-modal').css('left', e.clientX + 185);
    $('#tool-modal').css('top', e.clientY - e.offsetY);
    $('#tool-modal').toggleClass('d-none');
}

const openNoteModal = () => {
    $('#note-modal').css('left', $('#tool-modal').css('left'));
    $('#note-modal').css('top', $('#tool-modal').position().top + 40);
    $('#note-modal').removeClass('d-none');
}

function handleHighlight(color: string, slide_id: number, remark: any = '') {
    let t = (iframe_doc.all) ? iframe_doc.selection.createRange().text : iframe_doc.getSelection();

    let position_x = $('#tool-modal input[name="position_x"]').val(),
        position_y = $('#tool-modal input[name="position_y"]').val(),
        range = Object.assign({
        'anchor_node_offset': t.anchorOffset,
        'focus_node_offset': t.focusOffset,
    }, composeNodeInfo(t.anchorNode, 'anchor'), composeNodeInfo(t.focusNode, 'focus'));

    let highlight_note: NoteModel = {
        'slide_id': slide_id,
        'note_type': (remark ? 2 : 1),
        'note_text': t.toString(),
        'color': color,
        'position_x': (typeof position_x === 'string' ? parseInt(position_x) : 0),
        'position_y': (typeof position_y === 'string' ? parseInt(position_y) : 0),
        'remark': remark,
        'range': range
    };

    NoteAPI.CreateNote(highlight_note).then(res => {
        console.log('create_note:');
        console.log(res);
    });

    console.log(highlight_note);
    highlight(highlight_note);
    addNote(highlight_note);
    $('.custom-modal').addClass('d-none');
}

function composeNodeInfo(node: any, node_key: any) {
    let node_obj: any = {},
        node_identifier = '',
        parent_node_identifier = '',
        parent_identifier_key = node_key + '_node_parent_identifier',
        parent_index_key = node_key + '_node_parent_index',
        identifier_key = node_key + '_node_identifier',
        type_key = node_key + '_node_type',
        index_key = node_key + '_node_index',
        node_index = 0,
        parent_node_index = 0;

    if (node.nodeType == Node.TEXT_NODE) {
        parent_node_identifier = composeNodeIdentifier(node.parentNode);
        parent_node_index = $(iframe_doc).find(parent_node_identifier).index(node.parentNode);

        let parent_node = $(iframe_doc).find(parent_node_identifier)[parent_node_index];
        let text_nodes = $(parent_node).contents().filter(function() {
            return this.nodeType == 3;
        });

        node_index = text_nodes.index(node);
        node_obj[type_key] = NODE_TYPE_TEXT;
    } else {
        node_identifier = composeNodeIdentifier(node);
        node_index = $(node_identifier).index(node);
        node_obj[type_key] = NODE_TYPE_NORMAL;
    }

    node_obj[parent_identifier_key] = parent_node_identifier;
    node_obj[identifier_key] = node_identifier;
    node_obj[parent_index_key] = parent_node_index;
    node_obj[index_key] = node_index;

    return node_obj;
}

function composeNodeIdentifier(node: any) {
    let tag_name = $(node).prop('tagName'),
        id = $(node).prop('id'),
        class_name = $(node).prop('className');

    return tag_name.toLowerCase() + (id ? ('#' + id ) : '') + (class_name ? ('.' + class_name) : '');
}

function parseNodeInfo(node_info: any, node_key: any) {
    let type_key = node_key + '_node_type',
        index_key = node_key + '_node_index';

    if (node_info[type_key] == NODE_TYPE_TEXT) {
        let parent_identifier_key = node_key + '_node_parent_identifier',
            parent_node_index = node_key + '_node_parent_index';

        let parent_node = $(iframe_doc).find(node_info[parent_identifier_key])[node_info[parent_node_index]];
        let text_nodes = $(parent_node).contents().filter(function() {
            return this.nodeType == 3;
        });

        return text_nodes[node_info[index_key]];
    } else {
        let error = new Error('unhandled situation');
        console.log(error);
    }
}

function highlight(highlight_info: any) {
    let anchor_node = parseNodeInfo(highlight_info, 'anchor'),
        focus_node = parseNodeInfo(highlight_info, 'focus'),
        anchor_offset = highlight_info.anchor_node_offset,
        focus_offset = highlight_info.focus_node_offset,
        highlight_content = highlight_info.highlight_text,
        remark = highlight_info.remark,
        color = highlight_info.color;

    let highlight_node_prepend = '<mark',
        highlight_node_postpend = '</mark>',
        highlight_style = ('background-color: ' + color);

    if (remark) {
        highlight_style += ('; ' + 'border-bottom: 2px solid #5aa8f7;');
    }

    highlight_node_prepend += (' ' + 'style="' + highlight_style + '">');

    if (anchor_node.isSameNode(focus_node)) {
        console.log('is same node');

        if (anchor_offset == focus_offset) {
            return;
        }

        let begin_offset = (anchor_offset < focus_offset) ? anchor_offset : focus_offset,
            end_offset = (anchor_offset < focus_offset) ? focus_offset : anchor_offset,
            origin_content = $(anchor_node).text();
        $(anchor_node).replaceWith(origin_content.slice(0, begin_offset) + (highlight_node_prepend + highlight_content + highlight_node_postpend) + origin_content.slice(end_offset, origin_content.length));
    } else {
        console.log('is not same node');

        let range = new Range();
        let position = anchor_node.compareDocumentPosition(focus_node);
        if (position == 4) {
            range.setStart(anchor_node, anchor_offset);
            range.setEnd(focus_node, focus_offset);
        } else {
            range.setStart(focus_node, focus_offset);
            range.setEnd(anchor_node, anchor_offset);
        }

        let start = range.startContainer,
            end = range.endContainer,
            start_offset = range.startOffset,
            end_offset = range.endOffset;

        for (let node: Node|null = start; node = node.nextSibling; node = end) {
            $(node).html(highlight_node_prepend + $(node).text() + highlight_node_postpend);
        }

        let origin_start_content = $(start).text(),
            origin_end_content = $(end).text();

        $(start).replaceWith(origin_start_content.slice(0, start_offset) + highlight_node_prepend + origin_start_content.slice(start_offset, origin_start_content.length) + highlight_node_postpend);
        $(end).replaceWith(highlight_node_prepend + origin_end_content.slice(0, end_offset) + highlight_node_postpend + origin_end_content.slice(end_offset, origin_end_content.length));
    }
}

function addNote(highlight_info: any) {
    let color = highlight_info.color,
        highlight_content = highlight_info.highlight_text,
        position_x = highlight_info.position_x,
        position_y = highlight_info.position_y,
        remark = highlight_info.remark;

    $('.notes .body').append('<div class="message" @click="focusPage(' + position_x + ', ' + position_y + ');"><div class="prepend"><div class="dots" style="background-color: ' + color + ';"></div></div><span>' + highlight_content + '</span></div>');

    if (remark) {
        $('.notes .body').append('<span class="remark">' + remark + '</span>');
    }
}

function addNewNote(color: any, slide_id: number) {
    let note_remark = $('textarea[name="note"]').val();
    $('textarea[name="note"]').val('');

    handleHighlight(color, slide_id, note_remark);
}

export { loadFrame, openNoteModal, handleHighlight, addNewNote, iframe };
export type { NoteModel };
