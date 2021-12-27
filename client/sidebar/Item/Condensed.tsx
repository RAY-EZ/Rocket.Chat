// @ts-nocheck
import { Sidebar, ActionButton } from '@rocket.chat/fuselage';
import { useMutableCallback, usePrefersReducedMotion } from '@rocket.chat/fuselage-hooks';
import React, { memo, ReactElement, useState } from 'react';

const Condensed = ({
	icon,
	title = '',
	titleIcon: _titleIcon,
	avatar,
	actions,
	href,
	menuOptions: _menuOptions,
	unread,
	menu,
	badges,
	threadUnread: _threadUnread,
	...props
}): ReactElement => {
	const [menuVisibility, setMenuVisibility] = useState(!!window.DISABLE_ANIMATION);

	const isReduceMotionEnabled = usePrefersReducedMotion();

	const handleMenu = useMutableCallback((e) => {
		setMenuVisibility(e.target.offsetWidth > 0 && Boolean(menu));
	});
	const handleMenuEvent = {
		[isReduceMotionEnabled ? 'onMouseEnter' : 'onTransitionEnd']: handleMenu,
	};

	return (
		<Sidebar.Item {...props} href={href} clickable={!!href}>
			{avatar && <Sidebar.Item.Avatar>{avatar}</Sidebar.Item.Avatar>}
			<Sidebar.Item.Content>
				<Sidebar.Item.Wrapper>
					{icon}
					<Sidebar.Item.Title
						data-qa='sidebar-item-title'
						className={unread && 'rcx-sidebar-item--highlighted'}
					>
						{title}
					</Sidebar.Item.Title>
				</Sidebar.Item.Wrapper>
				{badges && <Sidebar.Item.Badge>{badges}</Sidebar.Item.Badge>}
				{menu && (
					<Sidebar.Item.Menu {...handleMenuEvent}>
						{menuVisibility ? (
							menu()
						) : (
							<ActionButton square ghost mini rcx-sidebar-item__menu icon='kebab' />
						)}
					</Sidebar.Item.Menu>
				)}
			</Sidebar.Item.Content>
			{actions && (
				<Sidebar.Item.Container>
					{<Sidebar.Item.Actions>{actions}</Sidebar.Item.Actions>}
				</Sidebar.Item.Container>
			)}
		</Sidebar.Item>
	);
};

export default memo(Condensed);