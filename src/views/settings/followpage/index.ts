import Vue from 'vue';
import Component from 'vue-class-component';
import {SocialApi, User, UserApi} from '../../../api';

class UserModel extends User {
  following: boolean = false;
  follower: boolean = false;
}

@Component({
  template: require('./followpage.html'),
  async mounted() {
    await this.fetchData();
  }
})
export class FollowPage extends Vue {
  allUsers: UserModel[] = [
    {id: 1, username: 'user1', following: false, follower: true},
    {id: 2, username: 'user2', following: true, follower: false},
  ];

  filterNumber: number = 0;

  filter(user: UserModel): boolean {
    if (this.filterNumber === 0) // all
      return true;
    if (this.filterNumber === 2) // following
      return user.following;
    if (this.filterNumber === 1) // follower
      return user.follower;
  }

  async follow(user: User) {
    try {
      await new SocialApi().followUser({
        id: this.$store.state.userID,
        othersID: user.id
      });
    } catch (e) {
      this.$message.error('关注失败');
      throw e;
    }
  }

  async unfollow(user: User) {
    try {
      await new SocialApi().unfollowUser({
          id: this.$store.state.userID,
          othersID: user.id
      });
    } catch (e) {
      this.$message.error('取消关注失败');
      throw e;
    }
  }

  async fetchData () {
    try {
      let users = await new UserApi().getUser({});
      let selfID = this.$store.state.userID;
      let followerIDs = await new SocialApi().getUserFollower({id: selfID});
      let followingIDs = await new SocialApi().getUserFollowing({id: selfID});
      this.allUsers = users.map(u => ({
        ...u,
        following: followingIDs.indexOf(u.id) >= 0,
        follower: followerIDs.indexOf(u.id) >= 0,
      }));
    } catch (e) {
      this.$message.error('获取关注信息失败');
      throw e;
    }
  }
}
