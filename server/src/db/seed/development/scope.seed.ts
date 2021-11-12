import { Scope } from '../../entity/scope.entity'
import { BaseSeed } from '../base.seed'

export default class ScopeSeed extends BaseSeed {
  async perform(): Promise<void> {
    const seedList = [
      {
        id: 1,
        name: 'お試し用プロジェクト',
        domain: 'http://localhost:3001',
        description:
          'コンテンツ登録やリリースをご自由にお試しください。Projectの編集機能やメンバー操作は制限されています。',
        token: '0601c7e9-af0b-4e1d-a0e7-fde28278e9c2',
      },
      {
        id: 2,
        name: 'サービス利用中',
        domain: 'http://localhost:3002',
        description: 'リリースを１度したことがあり、次のリリース予定なし',
      },
      { id: 3, name: 'サービス利用開始の作業中', domain: null, description: 'まだ未リリースでコンテンツの登録中' },
      { id: 4, name: 'お試し開始', domain: null, description: 'Scopeだけ登録した状態' },
    ]
    await this.createOrUpdate(seedList, Scope, ['id'])
  }
}
