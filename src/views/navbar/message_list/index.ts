import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import {Event, SocialApi} from '../../../api';
import moment from 'moment';

@Component({
  template: require('./message_list.html'),
  async mounted() {
    await this.fetchData();
  }
})
export class MessageList extends Vue {

  events: Event[] = [
    {content: 'message1', date: new Date(2017, 10, 11)},
    {content: 'message2', date: new Date(2017, 10, 10)},
    {content: 'message3', date: new Date(2017, 10, 9)},
  ];

  showTime(date: Date): string {
    return moment(date).format('MM-DD hh:mm');
  }

  async fetchData() {
    try {
      this.events = await new SocialApi().getUserEvents({
        userID: this.$store.state.userID,
        afterTime: new Date(2017, 1)
      });
      this.events.sort((a, b) => (a.date.valueOf() - b.date.valueOf()));
    } catch (e) {
      this.$message.error('获取消息失败');
    }
  }
}
