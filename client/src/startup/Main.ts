import { ClientConfig, PlayerConfig, DimensionsConfig } from '../models/configs'
import { DrawingCanvas } from '../drawingCanvas/DrawingCanvas'
import { Game } from './Game'
import { Client } from './Client'

export class Main {
    public loginScreen: HTMLElement
    public resetCanvasBtn: HTMLElement
    public mobileControls: HTMLElement
    public playerNameInput: HTMLInputElement
    public confirmBtn: HTMLElement
    public mobileUp: HTMLElement
    public mobileDown: HTMLElement
    public mobileLeft: HTMLElement
    public mobileRight: HTMLElement
    public gameScreen: HTMLElement
    public bagElement: HTMLElement
    public gearElement: HTMLElement
    public exitElement: HTMLElement
    public coinsElement: HTMLElement
    public hpTextElement: HTMLElement
    public xpTextElement: HTMLElement
    public hpBarElement: HTMLElement
    public xpBarElement: HTMLElement
    public atkTextElement: HTMLElement
    public defTextElement: HTMLElement
    public layersParentElement: HTMLElement
    public chatElement: HTMLElement
    public chatMessageElement: HTMLElement
    public chatBtn: HTMLElement
    public exitBtn: HTMLElement
    public messageElement: HTMLElement
    public showRankBtn: HTMLButtonElement
    public showPlayersBtn: HTMLButtonElement
    public rankElement: HTMLElement
    public playersElement: HTMLElement
    public top1Element: HTMLElement
    public top2Element: HTMLElement
    public top3Element: HTMLElement

    public drawingGrid: DrawingCanvas

    private playerConfig: PlayerConfig
    private gameConfig: DimensionsConfig

    private hasConfirmedName: boolean
    public game: Game | null
    public client: Client | null

    constructor(configs: ClientConfig) {
        this.loginScreen = document.getElementById('login')!
        this.resetCanvasBtn = document.getElementById('help-draw-mobile')!
        this.mobileControls = document.getElementById('mobile-controls')!
        this.playerNameInput = document.getElementById('player-name') as HTMLInputElement
        this.confirmBtn = document.getElementById('confirm-btn')!
        this.mobileUp = document.getElementById('up')!
        this.mobileDown = document.getElementById('down')!
        this.mobileLeft = document.getElementById('left')!
        this.mobileRight = document.getElementById('right')!
        this.gameScreen = document.getElementById('game')!
        this.bagElement = document.getElementById('bag')!
        this.gearElement = document.getElementById('gear')!
        this.exitElement = document.getElementById('exit')!
        this.coinsElement = document.getElementById('coins')!
        this.hpTextElement = document.getElementById('hp-text')!
        this.xpTextElement = document.getElementById('xp-text')!
        this.hpBarElement = document.getElementById('hp-bar')!
        this.xpBarElement = document.getElementById('xp-bar')!
        this.atkTextElement = document.getElementById('atk-text')!
        this.defTextElement = document.getElementById('def-text')!
        this.layersParentElement = document.getElementById('layers')!
        this.messageElement = document.getElementById('message')!
        this.chatElement = document.getElementById('chat')!
        this.chatMessageElement = document.getElementById('chat-message')! as HTMLInputElement
        this.chatBtn = document.getElementById('send-chat')! as HTMLButtonElement
        this.showRankBtn = document.getElementById('show-rank')! as HTMLButtonElement
        this.showPlayersBtn = document.getElementById('show-players')! as HTMLButtonElement
        this.exitBtn = document.getElementById('exit-btn')! as HTMLButtonElement
        this.rankElement = document.getElementById('game-rank')!
        this.playersElement = document.getElementById('game-info')!
        this.top1Element = document.getElementById('top1')!
        this.top2Element = document.getElementById('top2')!
        this.top3Element = document.getElementById('top3')!

        this.gameScreen.style.display = 'none'
        this.bagElement.style.display = 'none'
        this.coinsElement.style.display = 'none'
        this.gearElement.style.display = 'none'
        this.exitElement.style.display = 'none'
        this.hpTextElement.style.display = 'none'
        this.xpTextElement.style.display = 'none'
        this.chatElement.style.display = 'none'

        if (this.isMobile()) {
            this.setupMobile()
            configs.game.width = configs.game.width / 2
            configs.game.height = configs.game.height / 2
        }

        this.messageElement.style.maxWidth = `${configs.game.width}px`
        this.layersParentElement.style.width = `${configs.game.width}px`
        this.layersParentElement.style.height = `${configs.game.height}px`

        this.drawingGrid = new DrawingCanvas(configs.drawingGrid)

        this.playerConfig = {
            playerName: '',
            playerMatrix: [],
        }

        this.gameConfig = configs.game

        this.game = null
        this.client = null
        this.hasConfirmedName = false

        this.confirmBtn.onclick = () => {
            this.onConfirmName()
        }

        this.resetCanvasBtn.onclick = () => {
            this.drawingGrid.reset()
        }
    }

    setupMobile() {
        document.body.addEventListener(
            'touchmove',
            (e) => {
                e.preventDefault()
            },
            { passive: false }
        )
        const helpDesktop = document.getElementById('help-draw-desktop')!
        helpDesktop.style.display = 'none'
        this.resetCanvasBtn.style.display = 'block'
        this.layersParentElement.style.width = `${window.screen.width}px`
    }

    onConfirmName() {
        if(!this.validUsername(this.playerNameInput.value)) {
            alert('Insert a valid username (max length: 10)')
        }

        if (!this.hasConfirmedName) {
            if (this.playerNameInput.value && this.validUsername(this.playerNameInput.value)) {
                this.playerConfig.playerName = this.playerNameInput.value
                const hasDraw = this.drawingGrid.drawingMatrix.some((line) => line.some((collumn) => collumn === 1))
                if (hasDraw) {
                    this.hasConfirmedName = true
                    this.playerConfig.playerMatrix = this.drawingGrid.drawingMatrix.map((arr) => arr.slice())

                    if (this.isMobile()) {
                        const title = document.getElementById('title')!
                        const subtitle = document.getElementById('sub-title')!
                        title.style.fontSize = '1em'
                        subtitle.style.fontSize = '50%'
                    }
                    this.startGame()
                }
            }
        }
    }

    private startGame() {
        this.game = new Game(this.gameConfig, this)
        this.client = new Client(this.game, this.playerConfig, this)
    }

    private validUsername(username: string) {
        return username.match(/^\w+$/) && (username.length <= 15)
    }

    public isMobile(): boolean {
        const toMatch = [/Android/i, /webOS/i, /iPhone/i, /iPad/i, /iPod/i, /BlackBerry/i, /Windows Phone/i]

        return toMatch.some((toMatchItem) => navigator.userAgent.match(toMatchItem))
    }
}
