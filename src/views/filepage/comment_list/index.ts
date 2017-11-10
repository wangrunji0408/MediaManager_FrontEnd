import Vue from 'vue';
import Component from 'vue-class-component';
import {BASE_PATH, Comment, SocialApi} from '../../../api';

@Component({
  template: require('./comment_list.html'),
  props: ['fileID']
})
export class CommentList extends Vue {
  show: boolean = true;
  loading: boolean = false;
  fileID: string = '';
  comments: Comment[] = [
    {
      id: 1,
      fileID: '20',
      userID: 1,
      date: new Date(),
      type: 'comment',
      comment: 'Good'
    },
    {
      id: 2,
      fileID: '20',
      userID: 2,
      date: new Date(),
      type: 'star',
    },
    {
      id: 3,
      fileID: '20',
      userID: 3,
      date: new Date(),
      type: 'score',
      score: 5
    },
  ];

  getAvatarUrl(id: number): string {
    return 'https://lorempixel.com/125/125/technics/8/'; // TODO temp
    // return `${BASE_PATH}/user/${id}/avatar`;
  }

  async fetchData() {
    try {
      this.loading = true;
      this.comments = await new SocialApi().getFileComments(
        {fileID: this.fileID});
    } catch (e) {
      this.$message.error('获取评论失败');
    } finally {
      this.loading = false;
    }
  }
}
