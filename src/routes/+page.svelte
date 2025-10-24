<script lang="ts">
	// import { invalidateAll } from '$app/navigation';
	import { authClient } from '$lib/betterauth/client';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const session = authClient.useSession();
</script>

<div>
	{#if $session.data && data.usuario}
		<div>
			<p>
				NOME: {data.usuario.name}
			</p>
			<p>
				WHATSAPP: {data.usuario.campoWhatsapp}
			</p>
			<p>
				<img src={data.usuario.image} alt="FOTO" />
			</p>
			<button
				onclick={async () => {
					await authClient.signOut();
					// invalidateAll();
				}}
			>
				Sign Out
			</button>
		</div>
	{:else}
		<button
			onclick={async () => {
				await authClient.signIn.social({
					provider: 'google',
				});
			}}
		>
			Continue with GOOGLE
		</button>
	{/if}
</div>
