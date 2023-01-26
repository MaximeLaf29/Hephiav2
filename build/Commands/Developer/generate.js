"use strict";
const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');
const fileContext = 'Commands/Developer/generate.js, execute()';
module.exports = {
    data: new SlashCommandBuilder()
        .setName('generate')
        .setDescription('Generate a picture.')
        .setDMPermission(false)
        .addStringOption((options) => options
        .setName('prompt')
        .setDescription('Enter your prompt')
        .setMaxLength(512)
        .setRequired(true)),
    /**
     *
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction) {
        const genPrompt = interaction.options.getString('prompt');
        const data = {
            prompt: genPrompt,
            width: 512,
            height: 512,
            scale: 12,
            sampler: 'k_euler_ancestral',
            steps: 35,
            seed: 3426390469,
            n_samples: 1,
            ucPreset: 2,
            uc: 'lowres, lowres, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, normal quality, jpeg artifacts, signature, watermark, username, blurry'
        };
        await interaction.deferReply();
        axios
            .post('http://localhost:6969/generate', data)
            .then(async (res) => {
            console.log(`Status Code:${res.statusCode}`);
            const pictureBase64 = res.data.output[0];
            // eslint-disable-next-line new-cap
            const sfbuff = new Buffer.from(pictureBase64, 'base64');
            // await wait(4000)
            await interaction
                .editReply({
                content: 'Picture:',
                ephemeral: true,
                files: [{ attachment: sfbuff }]
            })
                .catch((_error) => {
                console.log("Can't edit reply to interaction! " + fileContext);
            });
        })
            .catch((err) => {
            console.log(err + ' - ' + fileContext);
        });
    }
};
