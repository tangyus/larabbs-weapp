import wepy from 'wepy'
import api from '@/utils/api'

export default class unreadCount extends wepy.mixin {
	data = {
		interval: null,
		unreadCount: 0
	}

	// 页面显示
	onShow() {
		this.updateUnreadCount()
		this.interval = setInterval(() => {
			this.updateUnreadCount()
		}, 30000)
	}

	// 页面隐藏
	onHide() {
		clearInterval(this.interval)
	}

	// 设置未读消息数
	updateUnreadCount() {
		// 从全局获取未读消息数
		this.unreadCount = this.$parent.globalData.unreadCount
		this.$apply()

		if (this.unreadCount) {
			// 设置 badge
			wepy.setTabBarBadge({
				index: 1,
				text: this.unreadCount.toString()
			})
		} else {
			// 移除 badge
			wepy.removeTabBarBadge({
				index: 1
			})
		}
	}
}