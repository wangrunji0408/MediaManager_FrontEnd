import Vue from 'vue';
import Component from 'vue-class-component';
import {BASE_PATH, Comment, CommentTypeEnum, SocialApi, UserApi} from '../../../api';
import {Watch} from 'vue-property-decorator';
import moment from 'moment';

class CommentModel extends Comment {
  editing: boolean = false;
  isNew: boolean = false;
  username: string = '';
}

@Component({
  template: require('./comment_list.html'),
  props: ['fileID']
})
export class CommentList extends Vue {
  show: boolean = false;
  loading: boolean = false;
  fileID: string = '';
  comments: CommentModel[] = [];

  getAvatarUrl(id: number): string {
    return `${BASE_PATH}/user/${id}/avatar`;
  }

  owns(comment: Comment): boolean {
    return comment.userID === this.$store.state.userID;
  }

  formatDate(date: Date): string {
    return moment(date).format('YYYY-MM-DD hh:mm');
  }

  async add(type: CommentTypeEnum) {
    let comment = {
      fileID: this.fileID,
      userID: this.$store.state.userID,
      type: type,
      editing: true,
      isNew: true,
      username: this.$store.state.username,
    };
    this.comments.push(comment);
    if (comment.type === 'star') {
      comment.editing = false;
      await this.editDone(comment);
    }
  }

  editBegin(comment: CommentModel) {
    comment.editing = true;
  }

  async editDone(comment: CommentModel) {
    try {
      comment.date = new Date();
      if (comment.isNew) {
        let rsp = await new SocialApi().postComment({body: comment});
        comment.id = rsp.id;
      }
      else
        await new SocialApi().updateComment({body: comment});
      comment.isNew = false;
      comment.editing = false;
    } catch (e) {
      this.$message.error('更新失败');
      throw e;
    }
  }

  async remove(comment: CommentModel) {
    if (!comment.isNew) {
      try {
        await new SocialApi().deleteComment({id: comment.id});
      } catch (e) {
        this.$message.error('删除失败');
        throw e;
      }
    }
    this.comments.splice(this.comments.indexOf(comment));
  }

  @Watch('fileID')
  async fetchData() {
    if (!this.fileID || this.fileID === '0')
      return;
    try {
      this.loading = true;
      let list = await new SocialApi().getFileComments(
        {fileID: this.fileID});
      this.comments = list.map(c => ({
        ...c,
        editing: false,
        isNew: false,
        username: `User ${c.userID}`,
      }));
      this.comments.forEach(async f => {
        let user = await new UserApi().getUserByName({id: f.userID});
        f.username = user.username;
      });
    } catch (e) {
      this.$message.error('获取评论失败');
    } finally {
      this.loading = false;
    }
  }
}
