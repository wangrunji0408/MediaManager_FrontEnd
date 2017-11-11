import Vue from 'vue';
import Component from 'vue-class-component';
import {BASE_PATH, Comment, CommentTypeEnum, SocialApi} from '../../../api';

class CommentModel extends Comment {
  editing: boolean = false;
  isNew: boolean = false;
}

@Component({
  template: require('./comment_list.html'),
  props: ['fileID']
})
export class CommentList extends Vue {
  show: boolean = false;
  loading: boolean = false;
  fileID: string = '';
  comments: CommentModel[] = [
    {
      id: 1,
      fileID: '20',
      userID: 1,
      date: new Date(),
      type: 'comment',
      comment: 'Good',
      editing: false,
      isNew: false,
    },
    {
      id: 2,
      fileID: '20',
      userID: 2,
      date: new Date(),
      type: 'star',
      editing: false,
      isNew: false,
    },
    {
      id: 3,
      fileID: '20',
      userID: 3,
      date: new Date(),
      type: 'score',
      score: 5,
      editing: false,
      isNew: false,
    },
  ];

  getAvatarUrl(id: number): string {
    return 'https://lorempixel.com/125/125/technics/8/'; // TODO temp
    // return `${BASE_PATH}/user/${id}/avatar`;
  }

  owns(comment: Comment): boolean {
    return comment.userID === this.$store.state.userID;
  }

  add(type: CommentTypeEnum) {
    // switch (type) {
    //   case 'comment':
    //   case 'star':
    //   case 'score':
    // }
    this.comments.push({
      fileID: this.fileID,
      userID: this.$store.state.userID,
      type: type,
      editing: true,
      isNew: true
    });

  }

  editBegin(comment: CommentModel) {
    comment.editing = true;
  }

  async editDone(comment: CommentModel) {
    try {
      if (comment.isNew)
        await new SocialApi().postComment({body: comment});
      else
        await new SocialApi().updateComment({body: comment});
      comment.isNew = false;
      comment.editing = false;
    } catch (e) {
      this.$message.error('更新失败');
    }
  }

  async remove(comment: CommentModel) {
    if (!comment.isNew) {
      try {
        await new SocialApi().deleteComment({id: comment.id});
      } catch (e) {
        this.$message.error('删除失败');
        return;
      }
    }
    this.comments.splice(this.comments.indexOf(comment));
  }

  async fetchData() {
    try {
      this.loading = true;
      let list = await new SocialApi().getFileComments(
        {fileID: this.fileID});
      this.comments = list.map(c => ({...c, editing: false, isNew: false}));
    } catch (e) {
      this.$message.error('获取评论失败');
    } finally {
      this.loading = false;
    }
  }
}
