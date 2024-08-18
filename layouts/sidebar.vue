<template>
    <div
        class="min-h-screen border-r w-56 p-4 flex flex-col justify-between h-full"
    >
        <div>
            <h1>ClassCraft</h1>
            <div>
                <nuxt-link to="/home" class="bg-blue-100 rounded-lg p-3 block">
                    Home
                </nuxt-link>
            </div>
            <div class="flex justify-between">
                <p>Your classes</p>
                <p>+ Add</p>
            </div>
            <nuxt-link to="/home" class="bg-blue-100 rounded-lg p-3 block">
                React 101
            </nuxt-link>
        </div>

        <div>Name Lastname</div>
    </div>
</template>
